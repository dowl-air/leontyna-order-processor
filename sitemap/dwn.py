import requests

def download_xml(url, save_path):
    """
    Download an XML file from the given URL and save it to the specified path.
    
    Parameters:
    url (str): The URL to the XML file.
    save_path (str): The local path to save the downloaded XML file.
    """
    try:
        # Send a GET request to the URL
        response = requests.get(url)
        # Raise an exception if the request was not successful
        response.raise_for_status()
        
        # Write the content of the response to the specified file
        with open(save_path, 'wb') as file:
            file.write(response.content)
        
        print(f"XML file successfully downloaded and saved to {save_path}")
    
    except requests.exceptions.RequestException as e:
        print(f"Failed to download XML file: {e}")

# Example usage
url = "http://www.leontyna.cz/customDataFeed/BC852493-EEAD-4A68-B60D-4B0F8A9461B5"
save_path = "feed_cz.xml"
download_xml(url, save_path)