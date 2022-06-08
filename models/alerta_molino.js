const { Schema, model } = require('mongoose');

const Alerta_MolinoSchema = Schema({
	fecha: {
		type: String,
	//	required: [true, 'obligatorio'],
		//unique: true,
	},
	temp_molino: {
		type: String,
		//required: [true, 'obligatorio'],
	//	unique: true,
	},
	alerta: {
		type: String,
	//	emun: ['Baja', 'Alta','Peligro'],
	//	required: [true, 'obligatorio'],
	//	unique: true,
	},
	//calcinacion: {
	//	type: Schema.Types.ObjectId,
	//	ref: 'Calcinacion',
	//	required: true,
	//},
});

Alerta_MolinoSchema.methods.toJSON = function() {
    const { __v, ...data  } = this.toObject();
    return data;
}
module.exports = model('Alerta_Molino', Alerta_MolinoSchema);
