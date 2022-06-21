const reducer = (state, action) =>{
    switch (action.type) {
        case "IN":
            return {...state,loggedin : true}
        case "OUT":
            return {...state,loggedin : false}
    }
}

export default reducer;