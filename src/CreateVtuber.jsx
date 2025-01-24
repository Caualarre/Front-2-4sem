import React, { useState } from "react";
import { useVtuberContext } from "./context/VtuberContext";
import './CreateVtuber.css';

const CreateVtuber = () => {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [empresaId, setEmpresaId] = useState("");
  const [imagem, setImagem] = useState(null);
  const { createVtuber } = useVtuberContext();

  const handleImagemChange = (e) => {
    setImagem(e.target.files[0]);
  };

  const handleCreateVtuber = async (e) => {
    e.preventDefault();

    if (!nome || !descricao || !empresaId || !imagem) {
      alert("Todos os campos devem ser preenchidos.");
      return;
    }

    const formData = new FormData();
    formData.append("nome", nome);
    formData.append("descricao", descricao);
    formData.append("empresa_id", empresaId);
    formData.append("imagem", imagem);

    try {
      await createVtuber(formData);
    } catch (error) {
      console.error("Erro ao criar VTuber:", error);
    }
  };

  return (
    <div className="create-vtuber-container">
      <h2>Criar VTuber</h2>
      <form onSubmit={handleCreateVtuber}>
        <label>
          Nome:
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Descrição:
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Empresa:
          <input
            type="text"
            value={empresaId}
            onChange={(e) => setEmpresaId(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Imagem:
          <input type="file" onChange={handleImagemChange} required />
        </label>
        <br />
        <button type="submit">Criar VTuber</button>
      </form>
    </div>
  );
};

export default CreateVtuber;
