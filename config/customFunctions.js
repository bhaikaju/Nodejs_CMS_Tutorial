module.exports = {
  
    selectOption : function (status, options) {
        
        return options.fn(this).replace(new RegExp('value=\"'+status+'\"'), '$&selected="selected"');
    },
    
    isEmpty: function (obj) {
        for(let key in obj) {
            if(obj.hasOwnProperty(key)) {
                return false;
            }
        }
        
        return true;
    }
    
    
};
