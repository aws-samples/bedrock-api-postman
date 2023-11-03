# Experiement Amazon Bedrock API with Postman
This Sample, aimed at developers and solution builders who excel in Rest API & frontend application development but have little or no knowledge of Python or Jupyter Notebooks, Here we introduced how to leverage foundation models (FMs) through [Amazon Bedrock](https://aws.amazon.com/bedrock/) and Postman. 

AI domains been majorly dominated by Python developers for all good reasons but application developers working in frontend and middle-ware development do not feel inclusive in this era of of machine learning models , neural networks, and algorithms. In spite of having deep understanding of customer domain and challenges, world's largest community of Javascript developers seems not able to ride on wave Generative AI  and solve business critical problems.

### Amazon Bedrock
Amazon Bedrock is a fully managed service that provides access to FMs from third-party providers and Amazon; available via an API. With Bedrock, you can choose from a variety of models to find the one that’s best suited for your use case.

[Postman](https://www.postman.com/) is a popular tool for testing APIs in an easy-to-use graphical environment. You can use Postman to send API requests to any REST API, and to receive responses to your requests. Using Postman is a convenient way to test and troubleshoot the calls that you make to the Amazon Bedrock API. This sample includes procedures for setting up and using Postman with Amazon Bedrock

> **Note**
Postman is developed by a third-party company. It isn't developed or supported by Amazon Web Services (AWS). To learn more about using Postman, or for assistance with issues related to Postman, see the Support center on the Postman website.

Within this sample, you'll explore some of the most common usage patterns we are seeing with our customers for Generative AI. We will show techniques for generating text and images, creating value for organizations by improving productivity. This is achieved by leveraging foundation models to help in composing emails, summarizing text, answering questions, building chatbots, and creating images. You will gain hands-on experience implementing these patterns via Bedrock APIs and Postman

### Intended Audience
This sample is intended for developers and system implementers. You don't have to be familiar with Amazon Bedrock API or Postman to complete the steps in this sample. You should be comfortable managing IAM policies and modifying JSON code examples.

### Generative AI Use Cases:
We will simply provide the Amazon Bedrock API with an input consisting of a task, an instruction and an input for the model under the hood to generate an output without providing any additional example. The purpose here is to demonstrate how the powerful LLMs easily understand the task at hand and generate compelling outputs.
![Generation](/static/image-2.png)
This sample includes usage examples for the following Usecases and feature:

- Generation
- Summarization
- Question Answering
- Text to Image
- Sentiment Analysis/Classification
- Translation

### Time Required
It should take about 30 minutes to complete all tasks in sample.

### Resource Usage Costs
There's no charge for creating an AWS account. However, by implementing this solution, you might incur AWS usage costs if you use Postman to do send request to Bedrock API.

## Getting started

### Prerequisites

Before you begin this guide, complete the following prerequisites:

1. You must have an AWS account. To create an AWS account, go to https://console.aws.amazon.com/ and choose Create a new AWS account.

2. Make sure that the account that you use to sign in to the AWS Management Console can create new IAM policies and roles.

3. You must [download](https://www.postman.com/downloads/) and install Postman on your computer. You can download Postman from the Postman website.

4. After you install Postman on your computer, create a Postman account. When you first start the Postman application, you're prompted to log in or create a new account. Follow the instructions provided by Postman to log in to your account or to create an account if you don't already have one.

### Enable AWS IAM permissions for Bedrock

you must have sufficient [AWS IAM permissions](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html) to call the Amazon Bedrock service.

To grant Bedrock access to your identity, you can:

- Open the [AWS IAM Console](https://us-east-1.console.aws.amazon.com/iam/home?#)
- Find your [Role](https://us-east-1.console.aws.amazon.com/iamv2/home?#/roles) (if using SageMaker or otherwise assuming an IAM Role), or else [User](https://us-east-1.console.aws.amazon.com/iamv2/home?#/users)
- Select *Add Permissions > Create Inline Policy* to attach new inline permissions, open the *JSON* editor and paste in the below example policy:

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "BedrockFullAccess",
            "Effect": "Allow",
            "Action": ["bedrock:*"],
            "Resource": "*"
        }
    ]
}
```
### Programmatic access
You provide your AWS access keys to make programmatic calls to AWS or to use the AWS Command Line Interface or AWS Tools for PowerShell. We recommend using short-term access keys when possible.

When you create a long-term access key, you create the access key ID (for example, AKIAIOSFODNN7EXAMPLE) and secret access key (for example, wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY) as a set. The secret access key is available for download only when you create it. If you don't download your secret access key or if you lose it, you must create a new one.

1. You can create a IAM user here https://console.aws.amazon.com/iam/ and attach the policy to it. When you create the user, IAM provides a set of credentials that allow Postman to carry out Amazon Bedrock API operations.

2. On the IAM console, in the navigation pane, choose Users. Select the user (PostmanUser) created in Step 1, and then select the Security credentials tab.In the Access keys section, choose Create access key.

3. On the Access key best practices management portal alternatives page, select Application running outside AWS. Then choose Next.Choose Create access key.On the Retrieve access keys page, copy the credentials that are shown in the Access key and Secret access key columns.
::alert(Note:
You must provide both the access key ID and the secret access key later in this guide. This is the only time that you're able to view the secret access key. We recommend that you copy it and save it in a safe location)

## Set up Postman
Now that you've created a user that's able to access the Amazon Bedrock API, you can set up Postman. In this section, you create one or more environments in Postman.

Step 2.1: Create Postman workspace
In Postman, a workspace is an organizational container for projects and environments. In this section, you create at least one workspace to use with Amazon Bedrock.

Create a workspace
In Postman, choose the more actions choose File, then choose New.

On the Create New window, choose Workspace.

Enter a name, summary, and set the visibility to personal. Then choose Create Workspace.

Step 2.2: Create Postman environments
In Postman, an environment is a set of variables that are stored as key-value pairs. You can use environments to change the configuration of the requests that you make through Postman, without having to change the API requests themselves.

In this section, you create at least one environment to use with Amazon Bedrock. Each environment that you create contains a set of variables that are specific to your account in a single AWS Region. If you use the procedures in this section to create more than one environment, you can change between Regions by choosing a different environment from the Environment menu in Postman.

## Import Bedrock OpenAPI specification in Postman
In Postman, a collection is a group of API requests. Requests in a collection are typically united by a common purpose. In this section, you create a new collection that contains a request template for each operation in the Amazon Bedrock API.

### To Import the Amazon Postman collection
Clone this repository

Navigate into the project directory

In Postman, choose the more actions menu, choose File, then choose Import.

Select ***Bedrock API.OpenAPI_Specification.json*** file, Choose Import. Postman imports the Amazon Bedrock collection, which contains example requests.

### Set Variables in Bedrock API Collection
  Click on Bedrock API in menu, navigate to variables tab and set four variables: endpoint, region, accessKey, and secretAccessKey. 
  ![Set variable](/static/env.png)

### Test your Postman configuration
  Navigate to *** Usecases > Generation > Generate Text *** request and click on send button to send an invoke request to run inference on a Titan Text model
![Test Hello World](/static/image-1.png)

---

## Lets Learn some basic parameter definitions

### Randomness and Diversity

Foundation models support the following parameters to control randomness and diversity in the 
response.

**Temperature** – Large language models use probability to construct the words in a sequence. For any 
given next word, there is a probability distribution of options for the next word in the sequence. When 
you set the temperature closer to zero, the model tends to select the higher-probability words. When 
you set the temperature further away from zero, the model may select a lower-probability word.

In technical terms, the temperature modulates the probability density function for the next tokens, 
implementing the temperature sampling technique. This parameter can deepen or flatten the density 
function curve. A lower value results in a steeper curve with more deterministic responses, and a higher 
value results in a flatter curve with more random responses.

**Top K** – Temperature defines the probability distribution of potential words, and Top K defines the cut 
off where the model no longer selects the words. For example, if K=50, the model selects from 50 of the 
most probable words that could be next in a given sequence. This reduces the probability that an unusual 
word gets selected next in a sequence.
In technical terms, Top K is the number of the highest-probability vocabulary tokens to keep for Top-
K-filtering - This limits the distribution of probable tokens, so the model chooses one of the highest-
probability tokens.

**Top P** – Top P defines a cut off based on the sum of probabilities of the potential choices. If you set Top 
P below 1.0, the model considers the most probable options and ignores less probable ones. Top P is 
similar to Top K, but instead of capping the number of choices, it caps choices based on the sum of their 
probabilities.
For the example prompt "I hear the hoof beats of ," you may want the model to provide "horses," 
"zebras" or "unicorns" as the next word. If you set the temperature to its maximum, without capping 
Top K or Top P, you increase the probability of getting unusual results such as "unicorns." If you set the 
temperature to 0, you increase the probability of "horses." If you set a high temperature and set Top K or 
Top P to the maximum, you increase the probability of "horses" or "zebras," and decrease the probability 
of "unicorns."

### Length

The following parameters control the length of the generated response.

**Response length** – Configures the minimum and maximum number of tokens to use in the generated 
response.

**Length penalty** – Length penalty optimizes the model to be more concise in its output by penalizing 
longer responses. Length penalty differs from response length as the response length is a hard cut off for 
the minimum or maximum response length.

In technical terms, the length penalty penalizes the model exponentially for lengthy responses. 0.0 
means no penalty. Set a value less than 0.0 for the model to generate longer sequences, or set a value 
greater than 0.0 for the model to produce shorter sequences.


### Repetitions

The following parameters help control repetition in the generated response.

**Repetition penalty (presence penalty)** – Prevents repetitions of the same words (tokens) in responses. 
1.0 means no penalty. Greater than 1.0 decreases repetition.

---
  
## Try out the models

With some theory out of the way, let's see the models in action! Navigate to different Actions of Bedrock API and Run the requests to see basic, synchronous example invocations



### 📁 Next: [Use cases](/Usecases.md)