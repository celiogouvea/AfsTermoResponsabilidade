import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import termoTexto from './termoTexto';

const modelURL = '/modelo.pdf';

export const renderHtmlToPdf = async (pdfText: any, pdfDoc: any, page: any) => {
    const fontSize = 10;
    const margin = 50;
    const lineHeight = fontSize * 1.5;
    let yPosition = page.getHeight() - margin;
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

    let lines = pdfText.split('\n');
    let currentLineIndex = 0;

    const addLineToPage = (line: any) => {
        page.drawText(line, {
            x: margin,
            y: yPosition,
            size: fontSize,
            font: helveticaFont,
            color: rgb(0, 0, 0),
        });
        yPosition -= lineHeight;
    };

    while (currentLineIndex < lines.length) {
        let line = lines[currentLineIndex];
        if (helveticaFont.widthOfTextAtSize(line, fontSize) <= (page.getWidth() - margin * 2)) {
            if (yPosition < margin) {
                yPosition = page.getHeight() - margin;
                page = pdfDoc.addPage([page.getWidth(), page.getHeight()]);
            }
            addLineToPage(line);
            currentLineIndex++;
        } else {
            const words = line.split(' ');
            let currentLine = '';
            for (const word of words) {
                if (helveticaFont.widthOfTextAtSize(currentLine + word, fontSize) <= (page.getWidth() - margin * 2)) {
                    currentLine += word + ' ';
                } else {
                    if (yPosition < margin) {
                        yPosition = page.getHeight() - margin;
                        page = pdfDoc.addPage([page.getWidth(), page.getHeight()]);
                    }
                    addLineToPage(currentLine);
                    currentLine = word + ' ';
                }
            }
            if (currentLine) {
                if (yPosition < margin) {
                    yPosition = page.getHeight() - margin;
                    page = pdfDoc.addPage([page.getWidth(), page.getHeight()]);
                }
                addLineToPage(currentLine);
            }
            currentLineIndex++;
        }
    }
};

export const createPDF = async (data: any) => {
    try {
        const pdfBytes = await fetch(modelURL).then(response => response.arrayBuffer());
        const modelDoc = await PDFDocument.load(pdfBytes);
        const [modelPage] = await modelDoc.getPages();

        const pdfDocNew = await PDFDocument.create();
        const embeddedPage = await pdfDocNew.embedPage(modelPage);
        const { width, height } = embeddedPage;
        let page = pdfDocNew.addPage([width, height]);
        page.drawPage(embeddedPage);

        const texto = termoTexto(
            data.nome,
            data.cpf,
            data.cnpj,
            data.notebook,
            data.monitor,
            data.celular,
            data.mouse,
            data.teclado,
            data.outros
        );
        const formattedText = texto.replace(/<[^>]+>/g, '').replace(/ +(?= )/g, '');

        await renderHtmlToPdf(formattedText, pdfDocNew, page);

        const pdfBytesNew = await pdfDocNew.save();
        return pdfBytesNew;
    } catch (error) {
        console.error("Erro ao criar PDF:", error);
    }
};
