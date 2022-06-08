const { Schema, model } = require('mongoose');

const Temperatura_HornoSchema = Schema({
	fecha: {
		type: String,
		required: [true, 'obligatorio'],
		//unique: true,
	},
	temp_horno: {
		type: String,
		required: [true, 'obligatorio'],
	//	unique: true,
	},
	alerta: {
		type: String,
		//emun: ['Baja', 'Alta','Peligro'],
		required: [true, 'obligatorio'],
	//	unique: true,
	},
	//calcinacion: {
	//	type: Schema.Types.ObjectId,
	//	ref: 'Calcinacion',
	//	required: true,
	//},
});

Temperatura_HornoSchema.methods.toJSON = function() {
    const { __v, ...data  } = this.toObject();
    return data;
}
module.exports = model('Temperatura_Horno', Temperatura_HornoSchema);
