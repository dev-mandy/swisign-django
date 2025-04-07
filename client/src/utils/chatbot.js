const chatbotUtils = (utilName, value) => {
    switch (utilName) {
        case 'next':
            return () => {
                alert('next')
            }
        case 'cancel':
            return () => {
                alert('cancel')
            }
        default:
            return () => { alert('zz') }
    }
}

export default chatbotUtils;