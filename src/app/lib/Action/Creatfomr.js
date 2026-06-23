// /app/lib/Dataaccses/api.js

 

 

 

const SERVER_URL = process.env.SERVER_URL || 'http://localhost:5000';



export const creatcompnay = async (token, ebookData) => {
  try {
    console.log("Sending ebook data to server:", ebookData);
   

   const response = await fetch(`${SERVER_URL}/createbook`, {
    method: "POST",
     headers: {
     "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
   },
    body: JSON.stringify(ebookData),
});

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Server error: ${response.status}`);
    }

    const data = await response.json();
    console.log("Server response:", data);
    
    // Check if insertion was successful
    if (data.insertedId) {
      return {
        success: true,
        insertedId: data.insertedId,
        message: 'Ebook created successfully'
      };
    } else {
      throw new Error('Failed to create ebook - no insertedId returned');
    }
  } catch (error) {
    console.error('Error in creatcompnay:', error);
    throw error;
  }
};