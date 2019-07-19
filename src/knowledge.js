const dialogflow = require('dialogflow').v2beta1;

async function createDocument(
  projectId,
  knowledgeBaseFullName,
  documentPath,
  documentName,
  knowledgeTypes,
  mimeType,
) {
  // Instantiate a DialogFlow Documents client.
  const client = new dialogflow.DocumentsClient({
    projectId,
  });

  const request = {
    parent: knowledgeBaseFullName,
    document: {
      knowledgeTypes: [knowledgeTypes],
      displayName: documentName,
      contentUri: documentPath,
      source: 'contentUri',
      mimeType,
    },
  };

  const [operation] = await client.createDocument(request);
  const [response] = await operation.promise();
  console.log('Document created');
  console.log(`Content URI...${response.contentUri}`);
  console.log(`displayName...${response.displayName}`);
  console.log(`mimeType...${response.mimeType}`);
  console.log(`name...${response.name}`);
  console.log(`source...${response.source}`);
}

async function getKnowledgeBase(projectId, knowledgeBaseId) {
  // Instantiate a DialogFlow client.
  const client = new dialogflow.KnowledgeBasesClient({
    projectId,
  });

  const formattedName = client.knowledgeBasePath(projectId, knowledgeBaseId);

  const [result] = await client.getKnowledgeBase({ name: formattedName });
  console.log(`displayName: ${result.displayName}`);
  console.log(`name: ${result.name}`);
}

module.exports = (req, res) => {
  res.send('ping received');
  getKnowledgeBase('visit-gent-qghbjt', 'faq_site_visitGent');
  createDocument('visit-gent-qghbjt', 'projects/visit-gent-qghbjt/knowledgeBases/faq_site_visitGent', 'k', 'faq2', 'FAQ', 'csv');
};
