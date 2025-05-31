    # # Initialize Gemini API
    # genai.configure(api_key = "AIzaSyDu5qZZaDWyI4Nr0xxe9NZb0SA1Gu91k4Y")  # Uses Qwiklabs environment config for API keys (so we don't hard-code the key)

    # # Create model instance (Gemini API)
    # model = genai.GenerativeModel("gemini-2.0-flash-001")

    # # Read image as bytes (convert the image to base64)
    # with open(image_path, "rb") as img:
    #     image_bytes = img.read()

    # # Send image + prompt with streaming enabled
    # responses = model.generate_content(
    #     contents=[
    #         {"text": "generate birthday wishes based on the image."},
    #         {"mime_type": "image/jpeg", "data": image_bytes}
    #     ],
    #     stream=True,
    # )

    # # Stream and print the result as it arrives
    # print("Streaming Birthday Wishes Based on Image:")
    # for chunk in responses:
    #     print(chunk.text, end="", flush=True)
# # === Import required modules ===
# import vertexai
# from vertexai.preview.vision_models import ImageGenerationModel
# import google.generativeai as genai

# # === Task 1: Generate image using Imagen 3.0 ===
# def generate_bouquet_image(prompt: str, project_id: str, location: str, output_file: str):
#     vertexai.init(project=project_id, location=location)
#     model = ImageGenerationModel.from_pretrained("imagen-3.0-generate-002")

#     images = model.generate_images(
#         prompt=prompt,
#         number_of_images=1,
#         seed=123,
#         add_watermark=False,
#     )

#     images[0].save(location=output_file)
#     print(f"✅ Image saved as {output_file}")


# # === Task 2: Analyze image using Gemini 2.0 Flash ===
# def analyze_bouquet_image(image_path: str):
#     api_key = "AIzaSyDu5qZZaDWyI4Nr0xxe9NZb0SA1Gu91k4Y"
#     genai.configure(api_key=api_key)

#     model = genai.GenerativeModel("gemini-pro-vision")

#     with open(image_path, "rb") as img:
#         image_bytes = img.read()

#     prompt = "Write a beautiful birthday wish based on this bouquet image."
#     response = model.generate_content([
#         prompt,
#         {
#             "mime_type": "image/png",
#             "data": image_bytes
#         }
#     ])

#     print("\n🎉 Generated Birthday Wish:\n")
#     print(response.text)


# # === Run the full flow ===
# if __name__ == "__main__":
#     PROJECT_ID = '"project-id"'
#     REGION = '"REGION"'
#     OUTPUT_FILE = "bouquet.png"
#     PROMPT = "Create an image containing a bouquet of 2 sunflowers and 3 roses"

#     generate_bouquet_image(PROMPT, PROJECT_ID, REGION, OUTPUT_FILE)
#     analyze_bouquet_image(OUTPUT_FILE)
# import vertexai
# from vertexai.preview.vision_models import ImageGenerationModel
# import google.generativeai as genai

# def generate_bouquet_image(prompt: str):
#     project_id = "qwiklabs-gcp-01-f5847f5e46f3"
#     location = "us-east4"
#     output_file = "image.jpeg"

#     # Initialize Vertex AI
#     vertexai.init(project=project_id, location=location)

#     # Load the model
#     model = ImageGenerationModel.from_pretrained("imagen-3.0-generate-002")

#     # Generate image
#     images = model.generate_images(
#         prompt=prompt,
#         number_of_images=1,
#         seed=1,
#         add_watermark=False,
#     )

#     # Save image locally
#     images[0].save(output_file)
#     print(f"Image saved to {output_file}")
#     return output_file


# def analyze_bouquet_image(image_path: str):
#     # Initialize Gemini API
#     genai.configure(api_key="AIzaSyDu5qZZaDWyI4Nr0xxe9NZb0SA1Gu91k4Y")  # You must add this line with your API key

#     # Create model instance
#     model = genai.GenerativeModel("gemini-2.0-flash-001")

#     # Read image as bytes
#     with open(image_path, "rb") as img:
#         image_bytes = img.read()

#     # Send image + prompt with streaming enabled
#     responses = model.generate_content(
#         contents=[
#             {"text": "generate birthday wishes based on the image."},
#             {"mime_type": "image/jpeg", "data": image_bytes}
#         ],
#         stream=True,
#     )

#     # Stream the result
#     for chunk in responses:
#         print(chunk.text, end="")

# if __name__ == "__main__":
#     path = generate_bouquet_image("Create an image containing a bouquet of 2 sunflowers and 3 roses.")
#     analyze_bouquet_image(image_path="image.jpeg")



import vertexai
from vertexai.preview.vision_models import ImageGenerationModel
import google.generativeai as genai
from google.generativeai import HttpOptions
import io

def generate_bouquet_image(prompt: str):
    project_id = "qwiklabs-gcp-01-f5847f5e46f3"  # Make sure the project ID is correct
    location = "us-east4"
    output_file = "image.jpeg"

    # Initialize Vertex AI
    vertexai.init(project=project_id, location=location)

    # Load the model (Imagen-3.0)
    model = ImageGenerationModel.from_pretrained("imagen-3.0-generate-002")

    # Generate image
    images = model.generate_images(
        prompt=prompt,
        number_of_images=1,
        seed=1,
        add_watermark=False,
    )

    # Save image locally
    images[0].save(output_file)
    print(f"Image saved to {output_file}")
    return output_file


def analyze_bouquet_image(image_path: str):
        # Use the client approach for accessing cloud resources
        client = genai.Client(http_options=HttpOptions(api_version="v1"))
        
        # Generate content using a cloud-hosted image
        response = client.generate_content(
            model="gemini-2.0-flash-001",
            contents=[
                "What is shown in this image?",
                {"uri": image_path, "mime_type": "image/jpeg"}
            ]
        )
        
        print("\nImage Description:")
        print(response.text)
        return response.text


if __name__ == "__main__":
    # Task 1: Generate the bouquet image with the specified prompt
    path = generate_bouquet_image("Create an image containing a bouquet of 2 sunflowers and 3 roses.")

    # Task 2: Analyze the generated image and stream the birthday wishes
    analyze_bouquet_image(image_path=path)
