const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const usuariosGet = async (req = request, res = response) => {

        // const { q, nombre = 'No name', apikey, page = 1, limit = 10, } = req.query;
        const { limite = 5, desde = 0 } = req.query;
        const query = { estado: true };
        // const usuarios = await Usuario.find(query)
        //     .skip(Number(desde))
        //     .limit(Number(limite));

        // const total = await Usuario.countDocuments(query);

        const [ total, usuarios ] = await Promise.all([
            Usuario.countDocuments(query),
            Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
        ])
        res.status(200).json({
            total,
            usuarios
        });
}

const usuariosPosts = async (req, res = response) => {

    const { nombre, correo, password, role } = req.body;
    const usuario = new Usuario({ nombre, correo, password, role });

    // Verificar si el correo existe
    
    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );

    // Guardar en BD
    await usuario.save();

    res.json({
        msg: 'post API - usuariosPost',
        usuario
    });
}

const usuariosDelete = async (req, res) => {
    const { id } = req.params;

    // Fisicamente lo borramos
    // const usuario = await Usuario.findByIdAndDelete( id );
    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false });
    
    res.json(usuario);
};

const usuariosPut = async (req, res) => {
    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;
    
    // TODO validar contra base de datos
    if ( password ) {
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto );


    res.status(400).json({
        msg: 'put API',
        usuario
    });
};

const usuariosPatch = (req, res) => {
    res.json({
        msg: 'patch API'
    });
};

module.exports = {
    usuariosGet,
    usuariosPosts,
    usuariosDelete,
    usuariosPut,
    usuariosPatch
}