// src/AttachmentValidator.js
import React, { useState, useEffect } from 'react';

const AttachmentValidator = ({ attachmentCategory }) => {
  const [attachmentExists, setAttachmentExists] = useState(false);

  useEffect(() => {
    const checkAttachment = async () => {
      try {
        const baseUrl = window.location.origin; // Obtém a URL base do ambiente em execução
        const response = await fetch(`${baseUrl}/api/getAttachments`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // Adicione outros cabeçalhos se necessário, como autenticação
          },
        });

        const attachments = await response.json();
        const exists = attachments.some(att => att.category === attachmentCategory);
        setAttachmentExists(exists);
      } catch (error) {
        console.error('Erro ao verificar anexos:', error);
      }
    };

    checkAttachment();
  }, [attachmentCategory]);

  return (
    <div>
      {attachmentExists ? (
        <p>Anexo encontrado na categoria: {attachmentCategory}</p>
      ) : (
        <p>Nenhum anexo encontrado na categoria: {attachmentCategory}</p>
      )}
    </div>
  );
};

export default AttachmentValidator;
