
// Registration Email Template

module.exports.template = () => {
    let text = `
__DATE__

__FIRST_NAME__ __LAST_NAME__,

Thank you for becoming a member!

Your __MEMBERSHIP_TYPE__ memberhip begins on __MEMBERSHIP_BEGIN__ and expires on __MEMBERHIP_EXPIRES__.

__ADDITIONAL_MEMBERS__

__ADDITIONAL_DONATION__

Thank you again!

PFLAG Rockland
`


    let html = `
<p>__DATE__</p>
<p>__FIRST_NAME__ __LAST_NAME__,</p>
<p>Thank you for becoming a member!</p>
<p>Your __MEMBERSHIP_TYPE__ memberhip begins on __MEMBERSHIP_BEGIN__ and expires on __MEMBERHIP_EXPIRES__.</p>
<p>__ADDITIONAL_MEMBERS__</p>
<p>__ADDITIONAL_DONATION__</p>
<p>Thank you again!</p>
<p>PFLAG Rockland<p>
`

    return {
        text: text,
        html: html,
        fields: {
            __DATE__: {
                required: true,
                description: 'date of the email'
            },
            __FIRST_NAME__: {
                required: true,
                description: 'first name of member'
            },
            __LAST_NAME__: {
                required: true,
                description: 'last name of member'
            },
            __MEMBERSHIP_TYPE__: {
                required: true,
                description: 'type of membership'
            },
            __MEMBERSHIP_BEGIN__: {
                required: true,
                description: 'membership begins date'
            },
            __MEMBERHIP_EXPIRES__: {
                required: true,
                description: 'membership ends date'
            },
            __ADDITIONAL_MEMBERS__: {
                required: false,
                description: 'additional members for a family membership',
            },
            __ADDITIONAL_DONATION__: {
                required: false,
                description: 'amount of any additional donation'
            },
        }
    }
}