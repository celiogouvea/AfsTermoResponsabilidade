import { useState } from 'react';
import { createPDF } from './PDFService';
import Form from './Form';

const App = () => {
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [notebook, setNotebook] = useState('');
    const [monitor, setMonitor] = useState('');
    const [celular, setCelular] = useState('');
    const [mouse, setMouse] = useState(false);
    const [teclado, setTeclado] = useState(false);

    const handleGeneratePDF = () => {
        
        const data = {
            nome,
            cpf,
            cnpj,
            notebook,
            monitor,
            celular,
            mouse,
            teclado
        };
        
        createPDF(data).then(pdfBuffer => {
            if (pdfBuffer) {
                const blob = new Blob([pdfBuffer], { type: 'application/pdf' });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = 'termo.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        });
    };

    return (
        <Form
            nome={nome}
            setNome={setNome}
            cpf={cpf}
            setCpf={setCpf}
            cnpj={cnpj}
            setCnpj={setCnpj}
            notebook={notebook}
            setNotebook={setNotebook}
            monitor={monitor}
            setMonitor={setMonitor}
            celular={celular}
            setCelular={setCelular}
            mouse={mouse}
            setMouse={setMouse}
            teclado={teclado}
            setTeclado={setTeclado}
            handleGeneratePDF={handleGeneratePDF}
        />
    );
};

export default App;
