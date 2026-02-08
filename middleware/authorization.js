const isAdmin = async (req, res, next) => {
    // console.log("check user is admin")
    // console.log(req.user)
    // console.log(req.user.role)

    // chaeck if user login
    if(!req.user)
        return res.status(401).json({message: "Unauthorized"})
    
// check user role
    if(req.user.role !== "ADMIN")
        return res.status(403).json({message: "Not authorzied. Only Admin role allowed."})

    next();
}

module.exports = isAdmin
