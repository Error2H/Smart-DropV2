const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const twilio = require('twilio');
const accountSid = functions.config().twilio.addountSid
const authToken = functions.config().twilio.authToken
const client = new twilio(accountSid, authToken);

const twilioNumber = '+66803131282' //my twilio phone number

/// Validate E164 format
function validE164(num) {
    return /^\+?[1-9]\d{1,14}$/.test(num)
}

exports.textStatus = functions.database
        .ref('/users')
        .onUpdate(event => {

            const phoneKey = event.params.phoneKey

            return admin.database()
                        .ref(`/users/${phoneKey}`)
                        .once('value')
                        .then(snapshot => snapshot.val())
                        .then(order => {
                            const status        = phone.status
                            const phoneNumber   = phone.phoneNumber

                            if ( !validE164(phoneNumber) ) {
                                throw new Error ('number must be E164 format!')
                            }

                            const textMessage = {
                                body: `Current parcel status: ${status}`,
                                to: phoneNumber,
                                from: twilioNumber
                            }

                            return client.messages.create(textMessage)
                        })
                        .then(message => console.log(message.sid, 'success'))
                        .catch()

        });