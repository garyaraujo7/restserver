const { Schema, model } = require('mongoose');

const MolinoSchema = Schema({
	fecha_inicio: {
		type: String,
		//default: Date.now,
		required: [true, 'obligatorio'],
		unique: true,
	},
	hora_inicio: {
		type: String,
		//default: Date.now,
		required: [true, 'obligatorio'],
		//unique: true,
	},
	fecha_fin: {
		type: String,
		//default: Date.now,
		required: [true, 'obligatorio'],
		unique: true,
	},
	hora_fin: {
		type: String,
		//default: Date.now,
		required: [true, 'obligatorio'],
	//	unique: true,
	},/*
	usuario: {
		type: Schema.Types.ObjectId,
		ref: 'Usuario',
		required: true,
	},*/
	usuario: {
		type:String,
		default: "",
		//required: true,
	},
});
MolinoSchema.methods.toJSON = function() {
    const { __v, ...data  } = this.toObject();
    return data;
}
module.exports = model('Molino', MolinoSchema);
