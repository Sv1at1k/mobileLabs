
const validate = (text,type) => {
   const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (type == "email") {
            if (regex.test(text)) {
                return true;
            } else {
               return false;
            }
        }
        if (type == "password") {
            if (text.length < 8) {
                return false;
            } else {
                return true;
            }
        }
        if (type == "name") {
            if (text.length < 1) {
                return false;
            } else {
                return true;
            }
        }
        if (type == "number") {
            if (text.length < 8) {
              return false;
            } else {
                return true;
            }
        }
}
export default validate;