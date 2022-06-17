const { response, request } = require('express');

const usuariosGet = (req = request, res = response) => {

        const { q, nombre = 'No name', apikey, page = 1, limit = 10, } = req.query;

        res.status(200).json({
            msg: 'get API',
            q,
            nombre, 
            apikey,
            page,
            limit
        });
}

const usuariosPosts = (req, res = response) => {
    const { nombre, edad } = req.body;

    res.status(201).json({
        msg: 'post API - usuariosPost',
        nombre,
        edad
    });
}

const usuariosDelete = (req, res) => {
    res.json({
        msg: 'delete API'
    });
};

const usuariosPut = (req, res) => {
    const { id } = req.params;

    res.status(400).json({
        msg: 'put API',
        id
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