# Recipe_search
 Opensearch project
In OpenSearch, you can search the indexed fields in several ways depending on the type of field, the nature of your query, and the result you expect. Here are the most common types of search queries you can use for each field:

### 1. **Basic Match Search**
   Use the `match` query to search for a term in a particular field.

   **Example**: Search for recipes that contain "onions" in the `ingredients` field.
   ```json
   {
     "query": {
       "match": {
         "ingredients": "onions"
       }
     }
   }
   ```

### 2. **Term Query**
   Use the `term` query to find documents that contain an exact match in a field. This works best for exact values like numbers or keywords, rather than analyzed text.

   **Example**: Search for recipes that have exactly 403 calories.
   ```json
   {
     "query": {
       "term": {
         "calories": 403
       }
     }
   }
   ```

### 3. **Range Query**
   Use the `range` query to find documents with values within a certain range, useful for numerical or date fields.

   **Example**: Search for recipes with a calorie count between 300 and 500.
   ```json
   {
     "query": {
       "range": {
         "calories": {
           "gte": 300,
           "lte": 500
         }
       }
     }
   }
   ```

   **Example**: Search for recipes added after a certain date.
   ```json
   {
     "query": {
       "range": {
         "date": {
           "gte": "2000-01-01"
         }
       }
     }
   }
   ```

### 4. **Multi-Match Query**
   Use the `multi_match` query when you want to search for a term across multiple fields.

   **Example**: Search for "onion" in both `title` and `ingredients` fields.
   ```json
   {
     "query": {
       "multi_match": {
         "query": "onion",
         "fields": ["title", "ingredients"]
       }
     }
   }
   ```

### 5. **Wildcard Query**
   Use the `wildcard` query when you want to perform partial or pattern matching.

   **Example**: Search for recipes whose title contains the word "Terrine" anywhere.
   ```json
   {
     "query": {
       "wildcard": {
         "title": "Terrine*"
       }
     }
   }
   ```

### 6. **Prefix Query**
   The `prefix` query is used to match documents that have fields starting with a specific string.

   **Example**: Search for recipes with titles starting with "Boudin".
   ```json
   {
     "query": {
       "prefix": {
         "title": {
           "value": "Boudin"
         }
       }
     }
   }
   ```

### 7. **Filter Query**
   A `filter` allows you to include specific conditions without scoring (i.e., without relevance ranking). This is useful for fields like categories or exact values.

   **Example**: Filter recipes that fall under the "Pork" category.
   ```json
   {
     "query": {
       "bool": {
         "filter": [
           { "term": { "categories": "Pork" } }
         ]
       }
     }
   }
   ```

### 8. **Bool Query (Combining Queries)**
   The `bool` query allows you to combine multiple query types using `must`, `should`, and `must_not`.

   **Example**: Search for recipes that have "onion" in the ingredients and a calorie count between 300 and 500.
   ```json
   {
     "query": {
       "bool": {
         "must": [
           { "match": { "ingredients": "onion" } },
           { "range": { "calories": { "gte": 300, "lte": 500 } } }
         ]
       }
     }
   }
   ```

### 9. **Aggregations (Faceted Search)**
   Aggregations allow you to group and count results by a field. This is useful when building filters for categories, ranges, etc.

   **Example**: Get the count of recipes by category.
   ```json
   {
     "aggs": {
       "by_category": {
         "terms": {
           "field": "categories.keyword"
         }
       }
     }
   }
   ```

### 10. **Fuzzy Search**
   Use `fuzzy` search for approximate matching, useful when you expect typos or want results for similar terms.

   **Example**: Search for recipes where the title is similar to "Boudan" (this might return "Boudin").
   ```json
   {
     "query": {
       "fuzzy": {
         "title": {
           "value": "Boudan",
           "fuzziness": "AUTO"
         }
       }
     }
   }
   ```

### 11. **Exists Query**
   The `exists` query allows you to find documents where a certain field is present (i.e., it has a non-null value).

   **Example**: Find all recipes that have a `description`.
   ```json
   {
     "query": {
       "exists": {
         "field": "desc"
       }
     }
   }
   ```

### Example: Postman Search Request
To test these queries in Postman, use the following setup:

1. **Method**: `POST`
2. **URL**: `http://localhost:9200/recipe_indexing/_search`
3. **Body**: Select `raw` and `JSON` and paste the query you want to test.

For example, to search for recipes containing "onions" in the ingredients:

```json
{
  "query": {
    "match": {
      "ingredients": "onions"
    }
  }
}
```

### Conclusion
These are some of the common ways to search fields in OpenSearch. Depending on your use case (exact matching, partial matching, range search, etc.), you can choose the most suitable query type. You can combine queries with `bool` queries to create more complex searches.
