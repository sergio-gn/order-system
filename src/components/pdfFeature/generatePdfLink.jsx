import { PDFDownloadLink } from '@react-pdf/renderer';
import  PDFDocument  from './pdfDocument';

const GeneratePDFLink = ({ cartItems, quantities }) => {
    const pdfData = (
      <PDFDocument cartItems={cartItems} quantities={quantities} />
    );
    const blob = new Blob([pdfData], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
  
    return (
      <PDFDownloadLink 
        className="cart-pdflink"
        document={pdfData}
        fileName="cart.pdf"
      >
        {({ loading }) =>
          loading ? 'Loading document...' : 'Download PDF'
        }
      </PDFDownloadLink>
    );
  };

export default GeneratePDFLink;