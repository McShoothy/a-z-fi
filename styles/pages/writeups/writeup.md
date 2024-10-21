# HackTheBox Challenge Walkthrough: AI Metaphor Decoding

## Challenge Description

We were presented with an intriguing scenario:

> Words carry semantic information. Similar to how people can infer meaning based on a word's context, AI can derive representations for words based on their context too! However, the kinds of meaning that a model uses may not match ours. We've found a pair of AIs speaking in metaphors that we can't make any sense of! The embedding model is glove-twitter-25. Note that the flag should be fully ASCII and starts with 'htb{'.

## Approach

To solve this challenge, we needed to decode the metaphorical language used by the AIs. The key was to use the specified word embedding model, GloVe (Global Vectors for Word Representation), specifically the "glove-twitter-25" version.

## Walkthrough

1. **Understanding the Challenge**:
   We started by carefully reading the challenge description. The key points were:
   - AIs are communicating in metaphors
   - We need to use the glove-twitter-25 embedding model
   - The flag is ASCII and starts with 'htb{'

2. **Examining the Data**:
   We opened the provided `chal.txt` file, which contained the AI conversation in metaphorical language.

3. **Setting Up the Environment**:
   We set up a Python environment and installed the necessary libraries, particularly `gensim` for handling word embeddings.

4. **Loading the GloVe Model**:
   We downloaded the glove-twitter-25 model and loaded it using gensim:
   ```python
   from gensim.models import KeyedVectors
   model = KeyedVectors.load_word2vec_format('glove-twitter-25.txt', binary=False)
   ```

5. **Decoding the Metaphors**:
   We created a function to decode the metaphorical language:
   ```python
   def decode_metaphor(word1, word2):
       return model.most_similar(positive=[word1, word2], topn=1)[0][0]
   ```

6. **Processing the Conversation**:
   We read the `chal.txt` file and processed each line of the conversation:
   ```python
   with open('chal.txt', 'r') as f:
       conversation = f.read().splitlines()
   
   decoded_messages = []
   for line in conversation:
       words = line.split()
       decoded_words = [decode_metaphor(words[i], words[i+1]) for i in range(0, len(words), 2)]
       decoded_messages.append(''.join(decoded_words))
   ```

7. **Extracting the Flag**:
   We searched for a string starting with 'htb{' in the decoded messages:
   ```python
   for message in decoded_messages:
       if message.startswith('htb{') and message.isascii():
           print(f"Found flag: {message}")
           break
   ```

8. **Iterative Refinement**:
   We refined our approach several times, adjusting our decoding algorithm based on partial results until we successfully extracted the flag.

## Key Insights

1. **Context Matters**: The challenge emphasized how AI derives meaning from context, which is exactly how word embeddings work.
2. **Vector Arithmetic**: Word embeddings allow for meaningful vector arithmetic, which was crucial in decoding the metaphors.
3. **Iterative Problem Solving**: We had to refine our approach multiple times, improving our decoding algorithm with each iteration.

## Conclusion

This challenge provided an excellent opportunity to explore the fascinating world of word embeddings and their applications in natural language processing. By leveraging the GloVe model and applying vector operations, we were able to decode the AI's metaphorical language and extract the hidden flag.

Solving this challenge required a combination of technical skills in Python and NLP libraries, creative thinking to interpret the results, and persistence in refining our approach through multiple iterations.
