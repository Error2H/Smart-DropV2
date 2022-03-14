<?php

/* API from THSMS.COM */
/* revised by Komkrit Aree */
/* idreamba@gmail.com */

$sms = new thsms();

// username & password
$sms->username   = 'ใส่ชื่อที่สมัครกับ thsms.com';
$sms->password   = 'รหัสผ่าน';

$call_default = '0000'; // 0000 is number default but you can change real number, plase contact provider.
$call_register = '085xxxxxxx'; // ใส่เบอร์มือถือของเรา
$text_massage = 'มีการลงทะเบียนสมาชิก'; // ใส่ข้อความตอบกลับ
 
$a = $sms->getCredit();
var_dump( $a);

// edit -> from, to, message
$b = $sms->send( $call_default, $call_register, $text_massage);
var_dump( $b);
 
class thsms
{
     var $api_url   = 'http://www.thsms.com/api/rest';
     var $username  = null;
     var $password  = null;
 
    public function getCredit()
    {
        $params['method']   = 'credit';
        $params['username'] = $this->username;
        $params['password'] = $this->password;
 
        $result = $this->curl( $params);
 
        $xml = @simplexml_load_string( $result);
 
        if (!is_object($xml))
        {
			echo "Respond error <hr/>";
            return array( FALSE, 'Respond error');
        } else {
 
            if ($xml->credit->status == 'success')
            {
				echo "Success <hr/>";
                return array( TRUE, $xml->credit->status);
				
            } else {
                return array( FALSE, $xml->credit->message);
            }
        }
    }
 
	// you can change call_default variable is real number
    public function send( $call_default=null, $to=null, $message=null)
    {
        $params['method']   = 'send';
        $params['username'] = $this->username;
        $params['password'] = $this->password;
 
        $params['from']     = $call_default;
        $params['to']       = $to;
        $params['message']  = $message;
 
        if (is_null( $params['to']) || is_null( $params['message']))
        {
            return FALSE;
        }
 
        $result = $this->curl( $params);
        $xml = @simplexml_load_string( $result);
        if (!is_object($xml))
        {
            return array( FALSE, 'Respond error');
        } else {
            if ($xml->send->status == 'success')
            {
                return array( TRUE, $xml->send->uuid);
            } else {
                return array( FALSE, $xml->send->message);
            }
        }
    }
     
    private function curl( $params=array())
    {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $this->api_url);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query( $params));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
 
        $response  = curl_exec($ch);
        $lastError = curl_error($ch);
        $lastReq = curl_getinfo($ch);
        curl_close($ch);
 
        return $response;
    }
}
?>