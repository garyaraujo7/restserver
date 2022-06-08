const { Schema, model } = require('mongoose');


const CicloSchema = Schema({
	ciclo_inicio: {
		type: String,
		//default: Date.now,
		required: [true, 'obligatorio'],
		//unique: true,
	},
	ciclo_fin: {
		type: String,
		//default: Date.now,
		required: [true, 'obligatorio'],
		//unique: true,
	},
	/*
	usuario: {
		type: Schema.Types.ObjectId,
		ref: 'Usuario',
		required: true,
	},*/
	usuario: {
		type:String,
		default: "",
		required: true,
	},
});

CicloSchema.methods.toJSON = function() {
    const { __v, ...data  } = this.toObject();
    return data;
}
module.exports = model('Ciclo', CicloSchema);