import React, { useState, useEffect } from 'react'
import axios from 'axios';

import "../style/CardPoke.css";

// ant desing component
import { Card, Modal } from 'antd';

const Cardpoke = () => {

  const [datos, setDatos] = useState([]);
  const [detail, setDetail] = useState({
    modal: false,
    nombre: "",
    img: "",
    habilidades: [{ name: "" }],
    move: [{ name: "" }],
    type: [{name: ""}]
  });

  useEffect(() => {
    showPK(25);
  }, [])

  const showPK = async (numero) => {
    let result = [];
    for (let i = 1; i < numero; i++) {
      await axios
        .get("https://pokeapi.co/api/v2/pokemon/" + i)
        .then(res => {
          result.push(res.data);
        })
        .catch(err => {
          console.log(err);
        })
      }
    setDatos(result);
  }

  const showModal = (poke) => {
    setDetail({
      modal: true,
      nombre: poke.name,
      img: poke.sprites.front_default,
      habilidades: poke.abilities[0].ability.name,
      move: poke.moves[0].move.name,
      type: poke.types[0].type.name
    });
  }

  const handleOk = () => {
    setDetail({
      modal: false
    });
  };

  const handleCancel = () => {
    setDetail({
      modal: false
    });
  };

  return (
    <div className="body">
      {datos.map((poke, i) => (
        <Card className="card" key={i} style={{ width: 400 }} onClick={(e) => showModal(poke, e)}>
          <p>{poke.name}</p>
          <img alt="" src={poke.sprites.front_default} />
        </Card>
      ))}
      <div>
        <Modal width="600px" title={detail.nombre} visible={detail.modal} onOk={handleOk} onCancel={handleCancel}>
          <div className="imgPokeModal">
            <img className="imgMod" src={detail.img} alt="" />
            <div>
              <span className="subtitle">Habilidades</span> <br></br>
              { detail.habilidades }
            </div>

            <div>
              <span className="subtitle">Movimiento</span> <br></br>
              { detail.move }
            </div>

            <div>
              <span className="subtitle">Tipo</span> <br></br>
              { detail.type }
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default Cardpoke;