from docx import Document
import fitz

def extract_text_from_docx(file_path):
    doc = Document(file_path)
    text = ""
    for paragraph in doc.paragraphs:
        text += paragraph.text + "\n"
    return text

def extract_text_from_pdf(file_path):
    doc = fitz.open(file_path)
    text=""
    for page in doc:
        text += page.get_text()
    return text