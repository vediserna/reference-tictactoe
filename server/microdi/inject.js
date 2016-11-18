module.exports=function(provided){
    return function(dependencyName){
        if(!provided[dependencyName]){
            throw new Error("Required dependency <" + dependencyName + "> is not provided.")
        }
        return provided[dependencyName];
    }
};