
import { Question, QuizConfig } from '@/types/quiz';

const questionBank = {
  general: {
    easy: [
      {
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        correctAnswer: 2,
        explanation: "Paris is the capital and most populous city of France."
      },
      {
        question: "How many days are there in a leap year?",
        options: ["365", "366", "367", "364"],
        correctAnswer: 1,
        explanation: "A leap year has 366 days, with an extra day added to February."
      },
      {
        question: "What is the largest planet in our solar system?",
        options: ["Earth", "Jupiter", "Saturn", "Mars"],
        correctAnswer: 1,
        explanation: "Jupiter is the largest planet in our solar system."
      },
      {
        question: "Which ocean is the largest?",
        options: ["Atlantic", "Indian", "Arctic", "Pacific"],
        correctAnswer: 3,
        explanation: "The Pacific Ocean is the largest ocean on Earth."
      },
      {
        question: "What is 7 x 8?",
        options: ["54", "56", "58", "52"],
        correctAnswer: 1,
        explanation: "7 multiplied by 8 equals 56."
      }
    ],
    medium: [
      {
        question: "Who wrote the novel '1984'?",
        options: ["George Orwell", "Aldous Huxley", "Ray Bradbury", "H.G. Wells"],
        correctAnswer: 0,
        explanation: "George Orwell wrote the dystopian novel '1984' published in 1949."
      },
      {
        question: "What is the chemical symbol for gold?",
        options: ["Go", "Gd", "Au", "Ag"],
        correctAnswer: 2,
        explanation: "Au is the chemical symbol for gold, derived from the Latin word 'aurum'."
      },
      {
        question: "In which year did World War II end?",
        options: ["1944", "1945", "1946", "1947"],
        correctAnswer: 1,
        explanation: "World War II ended in 1945 with the surrender of Japan in September."
      },
      {
        question: "What is the square root of 144?",
        options: ["10", "11", "12", "13"],
        correctAnswer: 2,
        explanation: "The square root of 144 is 12, since 12 × 12 = 144."
      },
      {
        question: "Which country has the most natural lakes?",
        options: ["Russia", "Canada", "Finland", "Sweden"],
        correctAnswer: 1,
        explanation: "Canada has the most natural lakes of any country in the world."
      }
    ],
    hard: [
      {
        question: "What is the Planck constant approximately equal to?",
        options: ["6.626 × 10^-34 J⋅s", "3.14 × 10^-34 J⋅s", "1.602 × 10^-19 C", "9.109 × 10^-31 kg"],
        correctAnswer: 0,
        explanation: "The Planck constant is approximately 6.626 × 10^-34 joule-seconds."
      },
      {
        question: "Which philosopher wrote 'Critique of Pure Reason'?",
        options: ["Hegel", "Kant", "Nietzsche", "Schopenhauer"],
        correctAnswer: 1,
        explanation: "Immanuel Kant wrote 'Critique of Pure Reason' in 1781."
      },
      {
        question: "What is the rarest blood type?",
        options: ["AB-", "O-", "Rh-null", "B-"],
        correctAnswer: 2,
        explanation: "Rh-null blood type is the rarest, found in fewer than 50 people worldwide."
      }
    ]
  },
  science: {
    easy: [
      {
        question: "What gas do plants absorb from the atmosphere?",
        options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
        correctAnswer: 2,
        explanation: "Plants absorb carbon dioxide from the atmosphere during photosynthesis."
      },
      {
        question: "How many bones are in the adult human body?",
        options: ["206", "208", "210", "212"],
        correctAnswer: 0,
        explanation: "The adult human body has 206 bones."
      },
      {
        question: "What is the center of an atom called?",
        options: ["Electron", "Proton", "Neutron", "Nucleus"],
        correctAnswer: 3,
        explanation: "The nucleus is the center of an atom, containing protons and neutrons."
      }
    ],
    medium: [
      {
        question: "What is the chemical formula for water?",
        options: ["H2O", "CO2", "NaCl", "O2"],
        correctAnswer: 0,
        explanation: "Water has the chemical formula H2O, consisting of two hydrogen atoms and one oxygen atom."
      },
      {
        question: "At what temperature does water freeze in Celsius?",
        options: ["-1°C", "0°C", "1°C", "32°C"],
        correctAnswer: 1,
        explanation: "Water freezes at 0°C (32°F) under standard atmospheric pressure."
      },
      {
        question: "What type of animal is a dolphin?",
        options: ["Fish", "Amphibian", "Mammal", "Reptile"],
        correctAnswer: 2,
        explanation: "Dolphins are marine mammals, not fish. They are warm-blooded and breathe air."
      }
    ],
    hard: [
      {
        question: "What is the half-life of Carbon-14?",
        options: ["5,730 years", "1,260 years", "12,000 years", "50,000 years"],
        correctAnswer: 0,
        explanation: "Carbon-14 has a half-life of approximately 5,730 years."
      },
      {
        question: "Which scientist proposed the theory of continental drift?",
        options: ["Charles Darwin", "Alfred Wegener", "Gregor Mendel", "Louis Pasteur"],
        correctAnswer: 1,
        explanation: "Alfred Wegener proposed the theory of continental drift in 1912."
      }
    ]
  },
  history: {
    easy: [
      {
        question: "Who was the first President of the United States?",
        options: ["Thomas Jefferson", "George Washington", "John Adams", "Benjamin Franklin"],
        correctAnswer: 1,
        explanation: "George Washington was the first President of the United States."
      },
      {
        question: "In which year did the Titanic sink?",
        options: ["1910", "1912", "1914", "1916"],
        correctAnswer: 1,
        explanation: "The Titanic sank on April 15, 1912, during its maiden voyage."
      }
    ],
    medium: [
      {
        question: "Which ancient wonder of the world was located in Alexandria?",
        options: ["Hanging Gardens", "Lighthouse of Alexandria", "Temple of Artemis", "Mausoleum at Halicarnassus"],
        correctAnswer: 1,
        explanation: "The Lighthouse of Alexandria was one of the Seven Wonders of the Ancient World."
      },
      {
        question: "Who was the British Prime Minister during most of World War II?",
        options: ["Neville Chamberlain", "Winston Churchill", "Clement Attlee", "Anthony Eden"],
        correctAnswer: 1,
        explanation: "Winston Churchill served as British Prime Minister during most of World War II."
      }
    ],
    hard: [
      {
        question: "What was the name of the Byzantine Empire's capital?",
        options: ["Athens", "Constantinople", "Rome", "Antioch"],
        correctAnswer: 1,
        explanation: "Constantinople (modern-day Istanbul) was the capital of the Byzantine Empire."
      }
    ]
  },
  sports: {
    easy: [
      {
        question: "How many players are on a basketball team on the court at one time?",
        options: ["4", "5", "6", "7"],
        correctAnswer: 1,
        explanation: "There are 5 players on a basketball team on the court at one time."
      },
      {
        question: "In which sport would you perform a slam dunk?",
        options: ["Tennis", "Basketball", "Volleyball", "Football"],
        correctAnswer: 1,
        explanation: "A slam dunk is performed in basketball."
      }
    ],
    medium: [
      {
        question: "How often are the Summer Olympic Games held?",
        options: ["Every 2 years", "Every 3 years", "Every 4 years", "Every 5 years"],
        correctAnswer: 2,
        explanation: "The Summer Olympic Games are held every 4 years."
      },
      {
        question: "Which country won the FIFA World Cup in 2018?",
        options: ["Brazil", "Germany", "France", "Argentina"],
        correctAnswer: 2,
        explanation: "France won the FIFA World Cup in 2018, held in Russia."
      }
    ],
    hard: [
      {
        question: "Who holds the record for most Grand Slam tennis titles in men's singles?",
        options: ["Roger Federer", "Rafael Nadal", "Novak Djokovic", "Pete Sampras"],
        correctAnswer: 2,
        explanation: "Novak Djokovic holds the record for most Grand Slam men's singles titles."
      }
    ]
  }
};

export const generateQuestions = (config: QuizConfig): Question[] => {
  const categoryQuestions = questionBank[config.category as keyof typeof questionBank];
  const difficultyQuestions = categoryQuestions[config.difficulty];
  
  // Shuffle questions and take the requested number
  const shuffled = [...difficultyQuestions].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, Math.min(config.numberOfQuestions, shuffled.length));
  
  // If we need more questions, add from other difficulties
  if (selected.length < config.numberOfQuestions) {
    const allQuestions = [
      ...categoryQuestions.easy,
      ...categoryQuestions.medium,
      ...categoryQuestions.hard
    ];
    const remaining = allQuestions
      .filter(q => !selected.includes(q))
      .sort(() => Math.random() - 0.5)
      .slice(0, config.numberOfQuestions - selected.length);
    
    selected.push(...remaining);
  }
  
  return selected.map((q, index) => ({
    id: index + 1,
    question: q.question,
    options: q.options,
    correctAnswer: q.correctAnswer,
    category: config.category,
    difficulty: config.difficulty,
    explanation: q.explanation
  }));
};
