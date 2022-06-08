const { Schema, model } = require('mongoose');

const BalanzaSchema = Schema({
	fecha_inicio: {
		type: String,
		//default: Date.now,
		required: [true, 'obligatorio'],
		//unique: true,
	},
	hora_inicio: {
		type: String,
		//default: Date.now,
		required: [true, 'obligatorio'],
	//	unique: true,
	},
	fecha_fin: {
		type: String,
		//default: Date.now,
		required: [true, 'obligatorio'],
	//	unique: true,
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
	bolsas_procesadas: {
		type: Number,
		required: [true, 'obligatorio'],
	//	unique: true,
	},
	usuario: {
		type:String,
		default: "",
		//required: true,
	},
	
});
BalanzaSchema.methods.toJSON = function() {
    const { __v, ...data  } = this.toObject();
    return data;
}
module.exports = model('Balanza', BalanzaSchema);
