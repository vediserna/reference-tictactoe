module.exports=function(injected){
    return function(dependencyName){
        if(!injected[dependencyName]){
            throw new Error("Required dependency " + dependencyName + " is not injected.")
        }
        return injected[dependencyName];
    }
};