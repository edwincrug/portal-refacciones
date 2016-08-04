'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Cotizacion', {
    idCotizacion: {
                    type: DataTypes.DECIMAL(18,0),
                    allowNull: false,
                    primaryKey: true,
                    autoIncrement: true
                  },    
    estatus: DataTypes.INTEGER,
    idUsuario: DataTypes.DECIMAL(18,0),
    descripcion: DataTypes.STRING,
    folio: DataTypes.STRING
  },
  {
    freezeTableName: true,

    // define the table's name
    tableName: 'Cotizacion'
  } //configuracion de tabla creada

  );
}
