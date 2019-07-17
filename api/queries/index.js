// eslint-disable-next-line no-unused-vars
const QueryType = {
  event:
  `PREFIX schema: <http://schema.org/>
  PREFIX geosparql: <http://www.opengis.net/ont/geosparql#>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
    PREFIX foaf: <http://xmlns.com/foaf/0.1/>
    SELECT
      ?attraction
      ?name
      ?description
      ?page
      #?locationPage
      ?image
    #?asWKT
      (MIN(?from) as ?fromMin)
      (MAX(?to) as ?toMax)
    WHERE {
      ?attraction a schema:Event .
      ?attraction schema:name ?name .
      ?attraction schema:description ?description .
      ?attraction foaf:page ?page .
      ?attraction schema:image ?image .
      OPTIONAL { ?attraction schema:location ?location } .
      #?location foaf:page ?locationPage .
      #?location schema:contactPoint ?contact .
      #?contact schema:geometry ?geometry .
     #?geometry geosparql:asWKT ?asWKT .
      ?attraction schema:openingHoursSpecification ?spec.
      ?spec schema:validFrom ?outFrom.
      ?spec schema:validThrough ?outTo.
      FILTER (?outFrom <= "{% startDate %}"^^xsd:date)
      FILTER (?outTo >= "{% endDate %}"^^xsd:date)
      FILTER (langMatches(lang(?name), "{% lang %}")) .
      FILTER (langMatches(lang(?name), lang(?description))) .
      {
        SELECT ?to ?from WHERE {
          ?attraction foaf:page ?page .
          ?attraction schema:openingHoursSpecification ?spec.
          ?spec schema:validFrom ?from.
          ?spec schema:validThrough ?to.
          ?spec schema:opens ?opens.
          ?spec schema:closes ?closes.
        } GROUP BY ?from ?to
      }
    }LIMIT 3`,
  attractions:
  `PREFIX dcterms: <http://purl.org/dc/terms/>
  PREFIX schema: <http://schema.org/>
  PREFIX n3: <http://schema.org/>
  PREFIX geosparql: <http://www.opengis.net/ont/geosparql#>
  PREFIX dcterm: <http://purl.org/dc/terms/>
  SELECT
    ?attraction
    (SAMPLE(?n) as ?name)
    (SAMPLE(?desc) as ?description)
    ?contactPoint
    ?geometry 
    ?asWKT
    ?nameSubject
    (IRI(?url) as ?page)
    (GROUP_CONCAT(?image; SEPARATOR=", ") AS ?imagesList)
  WHERE {
    ?attraction a <http://schema.org/TouristAttraction> .
    ?attraction n3:name ?n .
    ?attraction n3:description ?desc .
    ?attraction n3:url ?url .
    ?attraction n3:image ?image .
    FILTER (langMatches(lang(?n), lang(?desc))) .
    FILTER (langMatches(lang(?n), "{% lang %}")) .
    FILTER (langMatches(lang(?nameSubject), "{% lang %}")) .
    FILTER(CONTAINS(?nameSubject ,"{% subject %}")).
    FILTER(CONTAINS(?url, "/en/")).
 	{
    	SELECT ?contactPoint ?geometry ?attraction ?subject ?nameSubject
    	WHERE {
      	?attraction schema:contactPoint ?contactPoint .
        ?contactPoint schema:geometry ?geometry .
    	?geometry geosparql:asWKT ?asWKT .
    	?attraction dcterm:subject ?subject .
    	?subject n3:name ?nameSubject .
  		} GROUP BY ?contactPoint ?geometry ?attraction ?subject ?nameSubject
  	}
  } GROUP BY ?attraction ?nameSubject ?contactPoint ?geometry ?asWKT ?url`,
};

module.exports = { QueryType };
