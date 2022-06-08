const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
	nombre: {
		type: String,
		required: [true, 'El Nombre es obligatorio'],
		//unique: true,
	},
	apellidoP: {
		type: String,
		required: [true, 'El Apellido es obligatorio'],
		//unique: true,
	},
	apellidoM: {
		type: String,
		required: [true, 'El Apellido es obligatorio'],
		//unique: true,
	},
	celular:{
		type: String,
		required: [true, 'El Celular es obligatorio'],
		unique: true,
	},
	correo: {
		type: String,
		required: [true, 'El correo es obligatorio'],
		unique: true,
	},
	password: {
		type: String,
		required: [true, 'La contraseña es obligatoria'],
	},
	rol: {
		type: String,
		required: [true, 'El ROL es obligatorio'],
		emun: ['ROL_ADMINISTRADOR', 'ROL_SUPERVISOR'],
	},
	/*rol: {
		type: Schema.Types.ObjectId,
		ref: 'Role',
		required: true,
	}, */
	estado: {
		type: Boolean,
		default: true,
	},
});

UsuarioSchema.methods.toJSON = function () {
	const { __v, password, _id, ...usuario } = this.toObject();
	usuario.uid = _id;
	return usuario;
};

module.exports = model('Usuario', UsuarioSchema);
