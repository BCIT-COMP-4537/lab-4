export const MSG = {
  /* -------------------- CONFIG -------------------- */
  // Origin (protocol + domain + optional port) of Server2 (API).
  // Example: 'https://your-partner-api.onrender.com'
  API_ORIGIN: 'https://lab-4-r6j4.onrender.com',

  // Document/tab title (since <title> is empty in HTML)
  DOC_TITLE: 'Lab 5 - Patient Database',

  /* -------------------- PAGE TEXT -------------------- */
  PAGE_TITLE: 'Lab 5 — Patient Database',
  PAGE_SUBTITLE: 'Insert test patients into database, and search patients by SQL query',

  /* -------------------- INSERT CARD -------------------- */
  INSERT_HEADING: 'Insert',
  INSERT_DESC:
    'Press Insert to send sample patients to the database. Press multiple times to grow the table',
  INSERT_BUTTON: 'Insert',
  STATUS_INSERTING: 'Inserting...',
  STATUS_READY: '',
  STATUS_ERROR: 'Error',

  /* -------------------- QUERY CARD -------------------- */
  QUERY_HEADING: 'Run a SELECT query',
  QUERY_DESC:
    'Enter a SELECT statement to retrieve patient data.',
  QUERY_LABEL: 'SQL query',
  QUERY_BUTTON: 'Run SELECT',
  STATUS_QUERYING: 'Running query...',

  // Default query placed in the textarea on page load
  DEFAULT_QUERY: 'select * from people',

  /* -------------------- RESPONSE CARD -------------------- */
  RESPONSE_HEADING: 'Response',
  RESPONSE_DESC: 'The response will appear below.',
  DEFAULT_OUTPUT: '{}',

  /* -------------------- ERRORS -------------------- */
  ERROR_PRE: 'Error: ',
  ERROR_EMPTY: 'Please enter a SELECT query.',
  // Used by Api.js when throwing HTTP errors
  ERROR_HTTP: 'HTTP',

  /* -------------------- API PATHS (Server2 routes) -------------------- */
  // POST insert endpoint
  PATH_INSERT: '/lab5/api/v1/insert'
};