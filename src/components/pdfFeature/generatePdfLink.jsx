import { PDFDownloadLink } from '@react-pdf/renderer';
import  PDFDocument  from './pdfDocument';

const GeneratePDFLink = ({groupedCartItems, calculateTotal}) => {
    const pdfData = (
      <PDFDocument groupedCartItems={groupedCartItems} calculateTotal={calculateTotal} />
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