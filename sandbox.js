const mongoose = require('mongoose');

const models = require('./app/db/models');

const cls = new models.Class({
    // course: mongoose.Schema.Types.ObjectId('1'),
    // professor: mongoose.Schema.Types.ObjectId('1'),
    section: '3',
    semester: 'Fall 2019',
});

cls.save().catch((err) => console.log(err));
