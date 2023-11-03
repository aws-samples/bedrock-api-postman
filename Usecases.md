# 📁 Use cases
To demonstrate the generation capability of models in Amazon Bedrock, let's take the use case of email generation.

### Generation example

#### Persona
You are Bob a Customer Service Manager at AnyCompany and some of your customers are not happy with the customer service and are providing negative feedbacks on the service provided by customer support engineers. Now, you would like to respond to those customers humbly aplogizing for the poor service and regain trust. You need the help of an LLM to generate a bulk of emails for you which are human friendly and personalized to the customer's sentiment from previous email correspondence.

#### Implementation
To fulfill this use case, navigate to example Generate Email Content,it will show how to generate an email with a thank you note based on the customer's previous email. We will use the Amazon Titan Text Large model using the Amazon Bedrock API with Postman
## End-point: Generate Text
### Method: POST
>```
>{{baseUrl}}/model/amazon.titan-tg1-large/invoke
>```

### Body (**raw**)

```json
{"inputText": "Command: Write an email from Bob, Customer Service Manager, to the customer \"John Doe\" who provided negative feedback on the service provided by our customer support engineer",
"textGenerationConfig":{
        "maxTokenCount":4096,
        "stopSequences":[],
        "temperature":0,
        "topP":0.9
        }
    }} 
```

### Response: 200
```json
{
    "inputTextTokenCount": 32,
    "results": [
        {
            "tokenCount": 196,
            "outputText": "\nSubject: Apology for the poor service provided\n\nDear John Doe,\n\nI'm writing to express my regret for the poor service you received from one of our customer service engineers. We are sorry that we were unable to meet your expectations and that the problem was not resolved to your satisfaction.\n\nWe take customer feedback very seriously and are committed to resolving issues as quickly as possible. I have personally looked into the matter and will ensure that your complaint is addressed promptly and professionally.\n\nOur engineer who assisted you has been reminded of our customer service policies and procedures, and we will take appropriate action to ensure that this does not happen again.\n\nWe value your business and want to make things right for you. Please accept our apologies for any inconvenience caused. If you have any further questions or concerns, please do not hesitate to contact me directly.\n\nThank you for bringing this matter to our attention.\n\nBest regards,\nBob Customer Service Manager",
            "completionReason": "FINISH"
        }
    ]
} 
```

 ⁃ ⁃ ⁃ 

### Summarization

    This approach can be used to summarize call transcripts, meetings transcripts, books, articles, blog posts, and other relevant content.

    
## End-point: Summarize Text
### Method: POST

### Body (**raw**)

```json
{
    "inputText": "\"Please provide a summary of the following text. Do not add any information that is not mentioned in the text below. \n <text> \n AWS took all of that feedback from customers, and today we are excited to announce Amazon Bedrock, \n a new service that makes FMs from AI21 Labs, Anthropic, Stability AI, and Amazon accessible via an API. \n Bedrock is the easiest way for customers to build and scale generative AI-based applications using FMs, \n democratizing access for all builders. Bedrock will offer the ability to access a range of powerful FMs \n for text and images—including Amazons Titan FMs, which consist of two new LLMs we’re also announcing \n today—through a scalable, reliable, and secure AWS managed service. With Bedrock’s serverless experience, \n customers can easily find the right model for what they’re trying to get done, get started quickly, privately \n customize FMs with their own data, and easily integrate and deploy them into their applications using the AWS \n tools and capabilities they are familiar with, without having to manage any infrastructure (including integrations \n with Amazon SageMaker ML features like Experiments to test different models and Pipelines to manage their FMs at scale). </text>\"",
    "textGenerationConfig": {
        "maxTokenCount": 4096,
        "stopSequences": [],
        "temperature": 0,
        "topP": 0.9
    }
}
```

### Response: 200
```json
{
    "inputTextTokenCount": 261,
    "results": [
        {
            "tokenCount": 109,
            "outputText": "\n\"Amazon Bedrock is a new service that makes FMs from AI21 Labs, Anthropic, Stability AI, and Amazon accessible via an API. It offers the ability to access a range of powerful FMs for text and images through a scalable, reliable, and secure AWS managed service. Customers can easily find the right model for what they're trying to get done, get started quickly, privately customize FMs with their own data, and easily integrate and deploy them into their applications using the AWS tools and capabilities they are familiar with.\"",
            "completionReason": "FINISH"
        }
    ]
} 
```
Bedrock service generates the entire summary for the given prompt in a single output, this can be slow if the output contains large amount of tokens.

Below we explore the option how we can use Bedrock to stream the output such that the user could start consuming it as it is being generated by the model. For this Bedrock supports `InvokeModelWithResponseStream` API providing `ResponseStream` that streams the output in form of chunks.

## End-point: InvokeModelWithResponseStream
### Method: POST
>```
>{{baseUrl}}/model/amazon.titan-tg1-large/InvokeModelWithResponseStream
>```

### Body (**raw**)

```json
{"inputText": "Command: Write an email from Bob, Customer Service Manager, to the customer \"John Doe\" who provided negative feedback on the service provided by our customer support engineer",
"textGenerationConfig":{
        "maxTokenCount":4096,
        "stopSequences":[],
        "temperature":0,
        "topP":0.9
        }
    }} 
```

### Response: 200
```text
 (stream events)
<response chunk>
```

⁃ ⁃ ⁃ 

# Question and answers with Bedrock

    Question Answering (QA) is an important task that involves extracting answers to factual queries posed in natural language. Typically, a QA system processes a query against a knowledge base containing structured or unstructured data and generates a response with accurate information. Ensuring high accuracy is key to developing a useful, reliable and trustworthy question answering system, especially for enterprise use cases. 

Generative AI models like Titan and Claude use probability distributions to generate responses to questions. These models are trained on vast amounts of text data, which allows them to predict what comes next in a sequence or what word might follow a particular word. However, these models are not able to provide accurate or deterministic answers to every question because there is always some degree of uncertainty in the data. Enterprises need to query domain specific and proprietary data and use the information to answer questions, and more generally data on which the model has not been trained on. 

we will demonstrate how to use the Bedrock Titan model to provide information response to queries.

### Challenges
- How to have the model return factual answers for question

## Scenario

We are trying to model a situation where we are asking the model to provide information to change the tires. We will first ask the model based on the training data to provide us with an answer for our specific make and model of the car. This technique is called 'Zero Shot`. We will soon realize that even though the model seems to be returning the answers which seem relevant to our specific car, it is actually halucinating. The reason we can find that out is because we run through a fake car and we get almost similiar scenario and answer back

This situation implies we need to augment the model's training with additional data about our specific make and model of the car and then the model will return us very specific answer. In this experiment we will not use any external sources to augment the data but simulate how a RAG based augmentation system would work. 

To run our final test we provide a full detailed section from our manual which goes and explains for our specific car how the tire changes work and then we will test to get a curated response back from the model

## Task

To start the process, you select one of the models provided by Bedrock. For this use case you select Titan. These models are able to answer generic questions about cars.

For example you ask the Titan model to tell you how to change a flat tire on your Audi.

### Body (**raw**)

```json
{"inputText": "\"System: You are an helpful assistant. Answer questions in a concise way.  \n Question: How can I fix a flat tire on my Audi A8? \n Answer:\"",
"textGenerationConfig":{
        "maxTokenCount":4096,
        "stopSequences":[],
        "temperature":0,
        "topP":0.9
        }
    }} 
```

### Response: 200
```json
{
    "inputTextTokenCount": 36,
    "results": [
        {
            "tokenCount": 139,
            "outputText": "\n\"To fix a flat tire on your Audi A8, you will need a spare tire, a jack, and a lug wrench. First, locate the spare tire and tools in the trunk of your car. Then, use the lug wrench to loosen the lug nuts on the flat tire. After all the lug nuts are loose, position the jack under the car in the designated jacking point and raise the car until the flat tire is off the ground. Next, remove the lug nuts and the flat tire, and replace it with the spare tire. Tighten the lug nuts with the lug wrench, lower the car back to the ground, and make sure the spare tire is properly secured.\"",
            "completionReason": "FINISH"
        }
    ]
}
```
⁃ ⁃ ⁃ 

# Translation with Bedrock

Deliver highly accurate and continually improving translations for a wide range of use cases.

## End-point: Translate to Multiple Languages
### Method: POST

### Body (**raw**)

```json
{"inputText": "\"Statement: \"My name is Arthur\" \n                              Task:Translate Statement to German, Spanish & French ",
"textGenerationConfig":{
        "maxTokenCount":4096,
        "stopSequences":[],
        "temperature":0,
        "topP":0.9
        }
    }} 
```
### Response: 200
```json
{
    "inputTextTokenCount": 23,
    "results": [
        {
            "tokenCount": 36,
            "outputText": "\nMy name is Arthur.\n\nGerman Translation: Mein Name ist Arthur.\nSpanish Translation: Mi nombre es Arthur.\nFrench Translation: Mon nom est Arthur.",
            "completionReason": "FINISH"
        }
    ]
}
```

⁃ ⁃ ⁃ 

# Generating images using Stable Diffusion with Bedrock

    we show how to use [Stable Diffusion XL](https://stability.ai/stablediffusion) (SDXL) on [Amazon Bedrock](https://aws.amazon.com/bedrock/) for image generation (text-to-image) and image editing (image-to-image).

### Image prompting

Writing a good prompt can be somewhat of an art. It's often difficult to predict whether a certain prompt will yield a satisfactory image with a given model. However, there are certain templates that have been observed to work. Broadly, a prompt can be roughly broken down into three pieces:

1. **Type** of image (photograph/sketch/painting etc.)
2. **Description** of the content (subject/object/environment/scene etc.), and
3. **Style** of the image (realistic/artistic/type of art etc.).

You can change each of the three parts individually to generate variations of an image. Adjectives have been known to play a significant role in the image generation process. Also, adding more details help in the generation process.

To generate a realistic image, you can use phrases such as “a photo of”, “a photograph of”, “realistic” or “hyper realistic”. To generate images by artists you can use phrases like “by Pablo Piccaso” or “oil painting by Rembrandt” or “landscape art by Frederic Edwin Church” or “pencil drawing by Albrecht Dürer”. You can also combine different artists as well. To generate artistic image by category, you can add the art category in the prompt such as “lion on a beach, abstract”. Some other categories include “oil painting”, “pencil drawing, “pop art”, “digital art”, “anime”, “cartoon”, “futurism”, “watercolor”, “manga” etc. You can also include details such as lighting or camera lens such as 35mm wide lens or 85mm wide lens and details about the framing (portrait/landscape/close up etc.).

Note that model generates different images even if same prompt is given multiple times. So, you can generate multiple images and select the image that suits your application best.

## Text to Image

In text-to-image mode, we'll provide a text description of what image **should** be generated, called a `prompt`.

With Stable Diffusion XL (SDXL) we can also specify certain [style presets](https://platform.stability.ai/docs/release-notes#style-presets) to help influence the generation.

But what if we want to nudge the model to ***avoid*** specific content or style choices? Because image generation models are typically trained from *image descriptions*, trying to directly specify what you **don't** want in the prompt (for example `man without a beard`) doesn't usually work well: It would be very unusual to describe an image by the things it isn't!

Instead, SDXL lets us specify a `weight` for each prompt, which can be negative. We can also use this to provide `negative_prompts`:

## End-point: Character Design
### Method: POST
>```
>{{baseUrl}}/model/:model_identifier/invoke
>```
### Body (**raw**)

```json
{"inputText": "Character design of a robot warrior, concept art, contest winner, diverse medical cybersuits, Football armor, triade color scheme, black shirt underneath armor, in golden armor, clothes in military armor, high resolution render, octane "
} 
```
Through the Bedrock API, we can provide a range of parameters to influence image generation which generally correspond to those listed in the [Stable Diffusion API docs](https://platform.stability.ai/docs/api-reference#tag/v1generation).

One key point to note when using Bedrock is that output image PNG/JPEG data is returned as a [Base64 encoded string](https://en.wikipedia.org/wiki/Base64) within the JSON API response

⁃ ⁃ ⁃ 

# Sentiment Analysis/Classification with Bedrock

    You can use Bedrock api to perform sentiment analysis on user's reviews or comments, classification of content into categeories and even for content moderations. 

## End-point: Movie Review
### Method: POST
>```
>{{baseUrl}}//model/:model_identifier/invoke
>```


### Body (**raw**)

```json
{"inputText": "Review:This movie is so great and once again dazzles and delights us Is this movie review sentence negative or positive? \n                                       OPTIONS: -positive -negative ",
"textGenerationConfig":{
        "maxTokenCount":4096,
        "stopSequences":[],
        "temperature":0,
        "topP":0.9
        }
    }} 
```
### Response: 200
```json
{
    "inputTextTokenCount": 35,
    "results": [
        {
            "tokenCount": 2,
            "outputText": "\npositive",
            "completionReason": "FINISH"
        }
    ]
}
```


# Generate embeddings with Bedrock

Use text embeddings to convert text into meaningful vector representations. You input a body of text 
and the output is a (1 x n) vector. You can use embedding vectors for a wide variety of applications. 
Bedrock currently offers one model for text embedding that supports text similarity (finding the 
semantic similarity between bodies of text) and text retrieval (such as search).
For the text embeddings model, the input text size is 512 tokens and the output vector length is 4096.
To use a text embeddings model, Use InvokeModel to retrieve the vector representation of the input text from the specified model.

At the time of writing you can only use `amazon.titan-e1t-medium` as embedding model via the API.

## End-point: Creates an embedding vector representing the input text
### Method: POST
>```
>{{baseUrl}}/model/amazon.titan-e1t-medium/invoke
>```

### Body (**raw**)

```json
{"inputText": "Amazon Bedrock supports foundation models from industry-leading providers such as AI21 Labs, Anthropic, Stability AI, and Amazon. Choose the model that is best suited to achieving your unique goals."
    } 
```

### Response: 200
```json
{"embedding": [
        -0.026367188,
        0.14160156,
        -0.119140625,
        ....
]
        }
```

### 📁 Next: [Sample Application](/SampleApplication.md)


