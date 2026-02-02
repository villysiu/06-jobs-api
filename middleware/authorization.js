const isAdmin = async (req, res, next) => {
    if(!req.user)
        return res.status(401).json({message: "Unauthorized"})
    
    if(!req.user.role === "ADMIN")
        return res.status(403).json({messag: "Forbidden"})

    next();
}

module.exports = isAdmin
