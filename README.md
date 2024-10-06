

# Project Description

## Project Title: **FastAPI and React Integration with OpenSearch**

### Overview

This project aims to develop a web application using **FastAPI** for the backend and **React** for the frontend, integrated with **OpenSearch** for efficient data retrieval and search capabilities. The application will provide a seamless user experience with a responsive interface while leveraging the speed and performance of FastAPI and the powerful search capabilities of OpenSearch.

### Key Features

- **Search Functionality**: Utilize OpenSearch to provide fast and efficient search capabilities across data sets.
- **Responsive Design**: A modern and user-friendly interface built with React and CSS frameworks.

---

# Project Objectives

<details>
<summary>Click to expand objectives</summary>

1. **Develop a RESTful API**:
   - Implement a robust backend using FastAPI to handle client requests and responses efficiently.
   - Design endpoints for user authentication, data retrieval, and manipulation.

2. **Integrate OpenSearch**:
   - Set up and configure an OpenSearch instance for storing and querying data.
   - Implement search functionalities to enable users to find data quickly and efficiently.

3. **Create a Responsive Frontend**:
   - Develop a React-based user interface that is responsive and intuitive.
   - Use modern UI frameworks and libraries to enhance the user experience.


</details>



### Installation Guide for FastAPI with OpenSearch and React Frontend

<details>
<summary>Click to expand installation guide</summary>

### Installation Instructions

#### Step 1: Install OpenSearch

1. **Download OpenSearch**
   - Navigate to the [OpenSearch Downloads Page](https://opensearch.org/downloads.html) and download the latest version of OpenSearch.

2. **Extract the Archive** 
   - After downloading, extract the tarball or zip file to your desired directory.
   
   ```bash
   tar -zxf opensearch-x.x.x-linux-x64.tar.gz
   cd opensearch-x.x.x
   ```

3. **Run OpenSearch Server**
   - Start the OpenSearch server by running:
   
   ```bash
   ./opensearch-tar-install.sh
   ```
   
   Alternatively, you can run it with the following command:
   
   ```bash
   ./bin/opensearch
   ```

4. **Verify OpenSearch is Running**
   - Once started, OpenSearch will be accessible at `http://localhost:9200` by default. You can verify if it is up by running:

   ```bash
   curl -X GET "localhost:9200/"
   ```

#### Step 2: Clone the Repo

1. Open your terminal and clone the repository:
   
   ```bash
   git clone <repository-url>
   ```

2. Navigate into the cloned repository:
   
   ```bash
   cd <repository-folder>
   ```

#### Step 3: Run the Python Script to Inject Index into OpenSearch

1. Navigate to the `script` folder inside the cloned repo:
   
   ```bash
   cd script
   ```

2. Ensure you have the necessary Python dependencies installed. You might need to install `opensearch-py` or other required libraries by running:
   
   ```bash
   pip install opensearch-py
   ```

3. Run the `Injecting.py` script to insert the index into OpenSearch:
   
   ```bash
   python Injecting.py
   ```

   This script should take care of injecting your predefined index into the running OpenSearch instance.

---

## Prerequisites

Ensure you have the following installed:

- **Python**: Version 3.7 or later.
- **pip**: Python package installer (included with Python).
- **Node.js**: Version 14 or later (includes npm).

## Step 1: Set Up the FastAPI Backend

### Create a Virtual Environment

1. Open a terminal.
2. Navigate to your project directory or create a new directory for your project.
3. Create and activate a virtual environment.

### Create the `requirements.txt` File

1. In your backend project directory, create a file named `requirements.txt`.
2. Add the following dependencies:
   - `fastapi`
   - `uvicorn`
   - `opensearch-py`

### Install the Dependencies

With the virtual environment activated, run the command to install the packages listed in `requirements.txt`:

```bash
pip install -r requirements.txt
```

### Create Your FastAPI Application

1. Create a new Python file (e.g., `main.py`) in your backend project directory.
2. Set up your FastAPI application and configure CORS middleware.
3. Connect to your OpenSearch instance.

### Run Your FastAPI Application

Use Uvicorn to run your FastAPI application:

```bash
uvicorn main:app --reload
```

## Step 2: Set Up the React Frontend

### Navigate to the Frontend Directory

1. Open a new terminal window or tab.
2. Navigate to your frontend project directory:
   ```bash
   cd frontend
   ```

### Install Dependencies

Run the following command to install the React project's dependencies:

```bash
npm install
```

## Step 3: Run the React Application

After installing the dependencies, start the React development server:

```bash
npm start
```

## Step 4: Access Your Applications

1. Open a web browser and navigate to `http://127.0.0.1:8000` for your FastAPI application.
2. Open another tab and navigate to `http://localhost:3000` (or the specified port) for your React frontend.

</details>

---

# Project Documentation: Recipe Data Processing and Indexing

<details>
<summary>Click to expand project documentation</summary>

## Steps Taken to Build the Project

1. **Data Download**:
   - Downloaded a JSON file containing recipe data from the specified source.

2. **Data Analysis**:
   - Used **Pandas** in a **Jupyter Notebook** to analyze the downloaded JSON data.
   - Extracted insights and performed exploratory data analysis (EDA) to understand the structure and contents of the data.

3. **Data Cleaning**:
   - Identified and cleaned null or missing data entries to ensure the dataset is complete and reliable.
   - Analyzed the dataset for common keywords to understand the most frequent terms used in the recipes.

4. **Keyword Filtering**:
   - Based on the analysis, determined which filters should be present in the application for better search functionality and user experience.

5. **Index Creation**:
   - Created an `indexing.py` script to generate an index from the JSON file, facilitating faster data retrieval and search capabilities.

6. **Data Insertion**:
   - Developed an `inserting.py` script to insert the indexed data into the target system (e.g., OpenSearch), ensuring that the data is readily accessible for queries.

## Services Module (`app/services.py`)

### Overview

The `services.py` module is responsible for handling search functionality within the application. It utilizes the OpenSearch client to execute complex search queries based on user-defined parameters. The module is equipped with logging to track incoming queries and the search process for debugging and monitoring purposes.

### Key Components

1. **OpenSearch Client Initialization**:
   - The OpenSearch client is instantiated using a configuration method (`get_opensearch_client`), allowing interaction with the OpenSearch service.

2. **Logging**:
   - Configured logging to capture important events, including incoming queries and search execution results, which aids in debugging and performance monitoring.

3. **Search Functionality**:
   - The `search_recipes` function constructs a search query based on the input parameters and filters, enabling users to search for recipes with specific criteria.

### Search Function Implementation

- **Parameters Handling**: 
   - The function takes `query_params` to extract various search criteria such as keywords, ingredients, category, calorie range, protein range, sodium range, and rating.
   
- **Search Query Construction**:
   - Builds a structured search query using a `bool` query with `must` and `filter` clauses.
   - Supports multi-match queries across multiple fields (title, directions, ingredients, and description).
   - Incorporates filters for ingredients, categories, and nutritional values (calories, protein, sodium) using range queries.

- **Execution and Response**:
   - Executes the constructed search query using the OpenSearch client and returns the search results.
   - Logs the number of hits found to provide feedback on the search operation.

### Conclusion

The `services.py` module enhances the application's functionality by providing a robust and efficient search capability. By leveraging OpenSearch, it enables users to find recipes based on

 various criteria quickly and easily.

</details>

