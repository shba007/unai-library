---
title: 'Generate answers from question papers using AI'
description: "How can you get answers to your previous year's question paper using AI?"
pubDate: 'Aug 19 2023'
updatedDate: 'Aug 26 2023'
heroImage: '/blog-1/hero.jpg'
---

# How can you get answers to your previous year's question paper using AI?

In this article, we will deep dive on how to generate answers for any exam papers with simple, easy-to-follow steps. We will also discuss how AI technologies can be used to provide accurate answers quickly and effectively. We will also provide some tips and tricks to maximize the results.

## Gathering & Extraction

First we need to collect previous year question papers of the specific exam. We are doing it for CBSE 2023 - 12th - Marketing.

Then we need to extract the text from the PDF/Image. We used **_Microsoft Power Toys - Text Extractor_** but any online OCR Software can do that.

## Getting Answers using AI (LLM)

### Case 1 - Multiple Choice question without prompt

First We asked the question directly to the AI In this case ChatGPT. Here is an Example

<aside>
	<img src="https://www.notion.so/icons/light-bulb_yellow.svg" alt="/icons/light-bulb_yellow.svg" />
	<p>
		Q. Which of the following has one or more worksheets? <br />
		(a) Worksheet (b) Name box (c) Workbook (d) Cell
	</p>
</aside>

<aside>
<img src="https://www.notion.so/icons/send-to_blue.svg" alt="/icons/send-to_blue.svg"/>
<p>
   The correct answer is:<br />
   (c) Workbook <br />
   A workbook in spreadsheet software, such as Microsoft Excel, typically consists of one or more worksheets. Each worksheet is a separate tab within the workbook where you can enter and manipulate data. The term "worksheet" refers to an individual sheet within a workbook, and the term "workbook" refers to the entire file that contains one or more worksheets.
</p>
</aside>

Here we can see the explanation is too long. lets try a prompt

### Case 1.1 - Using a Prompt Format

We now use a prompt with format

> Answer the question and follow the instructions
>
> Q. [Question] <br/>
> A. [provide only the answer] <br/>
> E. [provide a very short and concise explanation] <br/>

<aside>
<img src="https://www.notion.so/icons/light-bulb_yellow.svg" alt="/icons/light-bulb_yellow.svg" /> 
<p>
   Answer the question and follow the instructions <br/><br/>
   Q. Which of the following has one or more worksheets? <br/>
   (a) Worksheet (b) Name box (c) Workbook (d) Cell <br/>
   A. provide only the answer <br/>
   Explanation - provide a very short and concise explanation <br/>
</p>
</aside>

<aside>
<img src="https://www.notion.so/icons/send-to_blue.svg" alt="/icons/send-to_blue.svg" /> 
<p>
   A. (c) Workbook <br/><br/>
   Explanation - A workbook contains one or more worksheets. <br/>
</p>
</aside>

Here we see the output is far more better then the case 1

### Case 2 - Short Question without prompt

First we ask the question directly

<aside>
<img src="https://www.notion.so/icons/light-bulb_yellow.svg" alt="/icons/light-bulb_yellow.svg"/>
<p>
   Q. Who constantly innovates to make industrial processes seamless and
   efficient ?
</p>
</aside>

<aside>
<img src="https://www.notion.so/icons/send-to_blue.svg" alt="/icons/send-to_blue.svg"/>
<p>
   Various entities and individuals contribute to constantly innovating and making industrial processes seamless and efficient. <br/>
   Some key players in this field include: <br/>
   <br/>1. **Industrial Engineers**: These professionals focus on optimizing complex systems and processes within industries. They work on designing, analyzing, and improving workflows to enhance efficiency and productivity.
   <br/> 2. **Research and Development (R&D) Departments**: Many companies allocate resources to R&D departments that are dedicated to developing new technologies, materials, and methodologies to improve industrial processes.
   <br/> 3. **Technology Companies**: Technology companies specializing in automation, artificial intelligence, data analytics, and the Internet of Things (IoT) create solutions that streamline and optimize industrial processes.
   <br/> 4. **Universities and Research Institutions**: Academic institutions conduct research in various fields related to industrial processes. They develop innovative approaches, technologies, and methodologies that can be adopted by industries to improve efficiency.
   <br/> 5. **Startups**: Startups often emerge with disruptive technologies and novel ideas aimed at solving specific industrial challenges. They can introduce new ways of doing things that lead to increased efficiency.
   <br/> 6. **Large Corporations**: Established corporations have the resources to invest in innovation. Many of them have dedicated innovation teams or labs focused on improving their existing processes and creating new ones.
   <br/> 7. **Consulting Firms**: Consulting firms specializing in process optimization and efficiency improvement provide valuable expertise to industries looking to streamline their operations.
   <br/> 8. **Government Initiatives**: Government agencies often support research and innovation through funding, grants, and incentives. These initiatives can lead to advancements in industrial processes.
   <br/> 9. **Collaborative Efforts**: Industry associations, consortiums, and partnerships between companies and research institutions can foster collaboration and innovation, pooling resources to develop efficient processes.
   <br/> 10. **Continuous Improvement Philosophies**: Many industries adopt philosophies like Lean Six Sigma, Total Quality Management, and Kaizen, which emphasize continuous improvement and innovation in processes.
   <br/> 11. **Automation and Robotics Companies**: These companies develop technologies like robotics, automation systems, and advanced control solutions that can drastically improve efficiency in various industrial sectors.
   <br/> 12. **Energy and Sustainability Experts**: As industries focus more on sustainability, experts in energy efficiency and environmentally-friendly practices contribute to optimizing processes while reducing resource consumption. <br/><br/>
   It's important to note that innovation is a collective effort involving a combination of individuals, organizations, and technologies working together to drive improvements in industrial processes.
</p>
</aside>

Here we can see the ai is give too long answer. Let’s try a prompt

### Case 2.1 - Using Word Limiting Prompt

> Answer the question and follow the instructions
>
> Q. [ Question ] <br/>
> A. [ provide a answer within 30 words]

<aside>
   <img src="https://www.notion.so/icons/light-bulb_yellow.svg" alt="/icons/light-bulb_yellow.svg" />
   <p>
      Answer the question and follow the instructions <br/>
      Q. Who constantly innovates to make industrial processes seamless and
      efficient ? <br/>
      A. provide a answer within 30 words
   </p>
</aside>

<aside>
   <img src="https://www.notion.so/icons/send-to_blue.svg" alt="/icons/send-to_blue.svg" />
   <p>
      Industrial engineers are responsible for constantly innovating to make industrial processes seamless and efficient through the application of various engineering and management principles.
   </p>
</aside>

Here you can see the answer is much shorter and concise

### Case 3 - Giving different types of questions

Here we give the AI a mixture of MCQ and SAQ.

<aside>
<img src="https://www.notion.so/icons/light-bulb_yellow.svg" alt="/icons/light-bulb_yellow.svg" />
<p>
   (i) Who constantly innovates to make industrial processes seamless and
   efficient ? <br/><br/>
   (ii) Which of the following has one or more worksheets ? <br/>
   (a) Worksheet (b) Name box <br/>
   (c) Workbook (d) Cell <br/><br/>
   (iii) What is not included in self-management ? <br/>
   (a) Motivating oneself (b) Achieving personal goals <br/>
   (c) Academic goals (d) Negative thinking <br/><br/>
   (iv) Shortcut key for Print is __________. <br/>
   (a) Ctrl + P (b) Ctrl + T <br/>
   (c) Ctrl + S (d) Ctrl + C <br/><br/>
   (v) Which one of the following helps to manage stress ? <br/>
   (a) Staying positive (b) Thinking about the past <br/>
   (c) Avoiding friends (d) Start crying <br/><br/>
   (vi) Individuals who focus on developing solutions that benefit the
   society are called __________. <br/>
   (a) Family businessman (b) Women entrepreneurs <br/>
   (c) First generation entrepreneurs (d) Social entrepreneurs
</p>
</aside>

<aside>
<img src="https://www.notion.so/icons/send-to_blue.svg" alt="/icons/send-to_blue.svg" />
<p>
   (i) **Engineers or Industrial Engineers** constantly innovate to make industrial processes seamless and efficient. They work on optimizing workflows, improving efficiency, and finding innovative solutions to streamline industrial operations. <br/>
   (ii) The correct answer is **(c) Workbook**. A workbook is a file containing one or more worksheets. Worksheets are the individual sheets within a workbook where you enter and manipulate data. <br/>
   (iii) The correct answer is **(d) Negative thinking**. Negative thinking is not included in self-management. Self-management typically involves positive behaviors such as motivating oneself, achieving personal goals, and maintaining a constructive mindset. <br/>
   (iv) The correct answer is **(a) Ctrl + P**. The shortcut key for printing a document is Ctrl + P. <br/>
   (v) The correct answer is **(a) Staying positive**. Staying positive and adopting healthy coping mechanisms can help manage stress. Thinking about the past, avoiding friends, and excessive emotional outbursts are not effective ways to manage stress. <br/>
   (vi) The correct answer is **(d) Social entrepreneurs**. Individuals who focus on developing solutions that benefit society, addressing social and environmental challenges, are called social entrepreneurs. They aim to create positive impact and change through their ventures. <br/>
</p>
</aside>

As we can see the AI is again being too verbose

### Case 3.1 - Prompt with Condition

> [ All The Questions ]
>
> Answer the questions and follow the instructions:
>
> M.C.Q and S.A.Q are provided, determine which questions are multiple choice questions (M.C.Q) and which are short answer type question (S.A.Q) among all the questions and give the question index
>
> if the question is (M.C.Q) then:
> "[index] - [type]
> Q. [provide the question]
> A. [provide answer]
> Explanation. [provide short explanation here]"
>
> if the question is (S.A.Q) then:
> "[index] - [type]
> Q.[provide the question]
> A. [provide answer within 30 words]"

<aside>
<img src="https://www.notion.so/icons/light-bulb_yellow.svg" alt="/icons/light-bulb_yellow.svg" />
<p>
   (i) Who constantly innovates to make industrial processes seamless and
   efficient ? <br/><br/>
   (ii) Which of the following has one or more worksheets ? <br/>
   (a) Worksheet (b) Name box <br/>
   (c) Workbook (d) Cell <br/><br/>
   (iii) What is not included in self-management ? <br/>
   (a) Motivating oneself (b) Achieving personal goals <br/>
   (c) Academic goals (d) Negative thinking <br/><br/>
   (iv) Shortcut key for Print is __________. <br/>
   (a) Ctrl + P (b) Ctrl + T <br/>
   (c) Ctrl + S (d) Ctrl + C <br/><br/>
   (v) Which one of the following helps to manage stress ? <br/>
   (a) Staying positive (b) Thinking about the past <br/>
   (c) Avoiding friends (d) Start crying <br/><br/>
   (vi) Individuals who focus on developing solutions that benefit the
   society are called __________. <br/>
   (a) Family businessman (b) Women entrepreneurs <br/>
   (c) First generation entrepreneurs (d) Social entrepreneurs <br/>
   Answer the questions and follow the instructions: <br/><br/>
   M.C.Q and S.A.Q are provided, determine which questions are multiple choice questions (M.C.Q) and which are short answer type question (S.A.Q) among all the questions and give the question index <br/><br/>
   if the question is (M.C.Q) then: <br/>
   "[index] - [type] <br/>
   Q. [provide the question] <br/>
   A. [provide answer] <br/>
   Explanation. [provide short explanation here]" <br/>
   if the question is (S.A.Q) then: <br/>
   "[index] - [type] <br/>
   Q.[provide the question] <br/>
   A. [provide answer within 30 words]" <br/>
</p>
</aside>

<aside>
<img src="https://www.notion.so/icons/send-to_blue.svg" alt="/icons/send-to_blue.svg" />
<p>
   Sure, I'd be happy to help you categorize the questions. Here are the question types along with the answers and explanations:<br/><br/>
   1. (S.A.Q) <br/>
      Q. Who constantly innovates to make industrial processes seamless and efficient? <br/>
      A. Engineers and industrial technologists. <br/>
      Explanation: Engineers and industrial technologists are responsible for innovating and improving industrial processes for greater efficiency.<br/><br/>
   2. (M.C.Q)<br/>
      Q. Which of the following has one or more worksheets?<br/>
      (a) Worksheet (b) Name box<br/>
      (c) Workbook (d) Cell<br/>
      A. (c) Workbook<br/>
      Explanation: A workbook in spreadsheet software like Excel contains one or more worksheets.<br/><br/>
   3. (S.A.Q)<br/>
      Q. What is not included in self-management?<br/>
      A. (c) Academic goals<br/>
      Explanation: Self-management involves aspects like motivating oneself, achieving personal goals, and managing tasks, but academic goals are not a typical component of self-management.<br/><br/>
   4. (M.C.Q)<br/>
      Q. Shortcut key for Print is __________.<br/>
      (a) Ctrl + P (b) Ctrl + T<br/>
      (c) Ctrl + S (d) Ctrl + C<br/>
      A. (a) Ctrl + P<br/>
      Explanation: Ctrl + P is the standard keyboard shortcut to print a document.<br/><br/>
   5. (S.A.Q)<br/>
      Q. Which one of the following helps manage stress?<br/>
      A. (a) Staying positive<br/>
      Explanation: Maintaining a positive mindset can help manage stress effectively.<br/><br/>
   6. (S.A.Q)<br/>
      Q. Individuals who focus on developing solutions that benefit the society are called __________.<br/>
      A. Social entrepreneurs<br/>
      Explanation: Social entrepreneurs work towards creating solutions that address societal challenges and benefit the community.<br/><br/>
   Please note that some of the questions had options to choose from, so I've provided the correct options and explanations accordingly.
</p>
</aside>

Here we see the formatting is same as we desired

### Case 4 - Logical Questions

Here we ask the AI to solve some physics questions

<aside>
   <img src="https://www.notion.so/icons/light-bulb_yellow.svg" alt="icons/light-bulb_yellow.svg" />
   <p>
      Your are an experienced teacher on the field of physics <br/><br/>
      Answer the question and follow the instructions <br/>
      Avoid any wrong or misleading answer <br/>
      Q. A point charge situated at a distance 'r' from a short electric dipole on its
      axis, experiences a force F . If the distance of the charge is '2r', the force
      on the charge will be: <br/>
      (a) F/2 (b) F/8 (c) F/4 (d) F/16 <br/>
      A. provide only the answer <br/>
      E. provide a very short logical explanation <br/>
   </p>
</aside>

<aside>
   <img src="https://www.notion.so/icons/send-to_blue.svg" alt="/icons/send-to_blue.svg" />
   <p>
      The force on the point charge at a distance of '2r' from the electric dipole will be (b) F/8.<br/><br/>
      Explanation: The electric field due to the electric dipole decreases with the inverse cube of the distance. Since the distance is doubled to '2r', the electric field at that point will be (1/2)^3 = 1/8 times the original electric field. Since force is proportional to the electric field, the force will also be 1/8 times the original force, which is F/8.
   </p>
</aside>

<aside>
   <img src="https://www.notion.so/icons/warning_red.svg" alt="/icons/warning_red.svg" />
   <p> 
      In this case we observed that the AI gives wrong answer sometimes. We tried different techniques but unable to make it consistent for current AI.
   </p>
</aside>

## Finding Question Pattern

For this step we have get a little bit into the technical side.

### Step 1 - Formatting the Question

First we are using a LLM (Like ChatGPT) to format the question

> {{ All The Questions }}
>
> Follow the instruction:
>
> from this questions extract every question without the index and options and put it in a array of yaml

Now save the response as “questions.yml” file using any text editor

### Step 2 - Generate Vector Embeddings

What is Vector Embedding???… In simple terms it’s an physical address of a particular content (Like Image, Audio, Text, Document). Like physical addresses where similar addresses generally tends to locate in the same neighborhood this analogy holds true also for Vector Embeddings.

> Note: It is generally represented using long sequence of numbers and each number range generally in 0 to 1 or -1 to +1.

Now we will use Google Colab which is a Code Execution Environment.

1. For this Open this [Notebook - Question Embeddings](https://colab.research.google.com/drive/1AbOAAp_-5clzc5DRET8PwM_cwFWRmsz4?usp=sharing).
1. After Connecting the Notebook in the left side of the window we see a sidebar.
1. In this sidebar we go to the files tab and now upload our “questions.yml” file
1. Now run using Ctrl + F9 Key or go-to Runtime → Run All
1. At the bottom we can see tensorboard window
1. Now In the top-right dropdown menu select projector

Voila… now you can see questions as a dot in 3D space. the more questions you have the more dots will emerge. When you have many question on the “questions.yml” (for starters at least 100, the more the better) you will see a different clusters emerge. The larger the cluster size the more common question it is.

<aside>
<img src="https://www.notion.so/icons/info-alternate_blue.svg" alt="/icons/info-alternate_blue.svg" />
<p>
If you are unable to see any clusters, or the points are very spread out you probably need more questions.
</p>
</aside>

## Summery

- Plain Question Vs Prompt the prompt result is always gives more concise and controlled output
- In Physics Question the AI gives Inconsistent Answers. It better not to blindly rely on current AI for calculative or deductive answer
- It is powerful for getting question answer in a specific format.

## Resources

- [ChatGPT 3.5](https://chat.openai.com)
- [Bing AI](https://www.bing.com/search?form=MY0291&OCID=MY0291&q=Bing+AI&showconv=1)
- [Perplexity AI](https://perplexity.ai/)
- [Claude AI](https://claude.ai/)
- [Google Colab](https://colab.research.google.com/)
- [Tensorboard](https://www.tensorflow.org/tensorboard)
- [Sentence Encoder](https://www.tensorflow.org/hub/tutorials/semantic_similarity_with_tf_hub_universal_encoder)

## Feedback

Give us Feedback by directly mailing us. Also If you spot any mistake in the post reach us via email at shirsendu2001@gmail.com. And if you have a topic in your mind about AI feel free to reach us, we will be happy to respond you.
