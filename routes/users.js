const router = require("express").Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");
const Profile = require('../models/profileSchema');

router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email });
		if (user)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		await new User({ ...req.body, password: hashPassword }).save();
		res.status(201).send({ message: "User created successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});
router.post('/profile', async (req, res) => {
    const { number, dateOfBirth, gender, age } = req.body;
    try {
        const profile = new Profile({ number, dateOfBirth, gender, age });
        await profile.save();
        return res.status(200).json("Profile updated successfully");
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
});


module.exports = router;
