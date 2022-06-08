const { Schema, model } = require('mongoose');

const ReporteSchema = Schema({
	nombre: {
		type: String,
		required: [true, 'obligatorio'],
		unique: true,
	},
	estado: {
		type: Boolean,
		default: true,
		required: true,
	},
	usuario: {
		type: Schema.Types.ObjectId,
		ref: 'Usuario',
		required: true,
	},
});

ReporteSchema.methods.toJSON = function() {
    const { __v, estado, ...data  } = this.toObject();
    return data;
}
module.exports = model('Reporte', ReporteSchema);
