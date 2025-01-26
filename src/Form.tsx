import { useState } from 'react';
import './App.css';

const Form = ({
    nome, setNome, cpf, setCpf, cnpj, setCnpj, notebook, setNotebook, monitor, setMonitor, celular, setCelular, mouse, setMouse, teclado, setTeclado, handleGeneratePDF,
}) => {
    const [showCNPJ, setShowCNPJ] = useState(false);
    const [showNotebok, setShowNotebok] = useState(false);
    const [showMonitor, setShowMonitor] = useState(false);
    const [showCelular, setShowCelular] = useState(false);

    const handleSubmit = (event: any) => {
        event.preventDefault();
        if (!nome
            || !cpf
            || (showCNPJ && !cnpj)
            || (showNotebok && !notebook)
            || (showMonitor && !monitor)
            || (showCelular && !celular)
        ) {
            alert('Por favor, preencha todos os campos obrigatórios.');
        } else {
            handleGeneratePDF();
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Gerar Termo de Responsabilidade</h1>
            <div className="form-inner">
                <label>Nome: </label>
                <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
            </div>
            <div className="form-inner">
                <label>CPF: </label>
                <input type="text" value={cpf} onChange={(e) => setCpf(e.target.value)} required />
            </div>
            <div className="form-inner">
                <label className="checkbox-label">
                    <input type="checkbox" checked={showCNPJ} onChange={() => setShowCNPJ(!showCNPJ)} />
                    Mostrar CNPJ
                </label>
                {showCNPJ && (
                    <div>
                        <label>CNPJ: </label>
                        <input type="text" value={cnpj} onChange={(e) => setCnpj(e.target.value)} />
                    </div>
                )}
            </div>
            <div className="form-inner">
                <label className="checkbox-label">
                    <input type="checkbox" checked={showNotebok} onChange={() => setShowNotebok(!showNotebok)} />
                    Notebook
                </label>
                {showNotebok && (
                    <div>
                        <label>Patrimônio: </label>
                        <input type="number" value={notebook} onChange={(e) => setNotebook(e.target.value)} required/>
                    </div>
                )}
            </div>
            <div className="form-inner">
                <label className="checkbox-label">
                    <input type="checkbox" checked={showMonitor} onChange={() => setShowMonitor(!showMonitor)} />
                    Monitor
                </label>
                {showMonitor && (
                    <div>
                        <label>Patrimônio: </label>
                        <input type="number" value={monitor} onChange={(e) => setMonitor(e.target.value)} required/>
                    </div>
                )}
            </div>
            <div className="form-inner">
                <label className="checkbox-label">
                    <input type="checkbox" checked={showCelular} onChange={() => setShowCelular(!showCelular)} />
                    Celular
                </label>
                {showCelular && (
                    <div>
                        <label>Patrimônio: </label>
                        <input type="number" value={celular} onChange={(e) => setCelular(e.target.value)} required/>
                    </div>
                )}
            </div>
            <div className="form-inner">
                <label className="checkbox-label">
                    <input type="checkbox" checked={mouse} onChange={(e) => setMouse(e.target.checked)} />
                    Mouse
                </label>
            </div>
            <div className="form-inner">
                <label className="checkbox-label">
                    <input type="checkbox" checked={teclado} onChange={(e) => setTeclado(e.target.checked)} />
                    Teclado
                </label>
            </div>
            <button className='.butto' type="submit">Gerar PDF</button>
        </form>

    );
};

export default Form;
