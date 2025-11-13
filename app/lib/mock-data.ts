import { Exam } from '../types/types';

export const examData: Exam = {
  id: 'aws-csa-associate',
  title: 'AWS Certified Solutions Architect - Associate',
  questions: [
    {
      id: 1,
      text: 'Which AWS service would you use to create a private network in the cloud?',
      answers: [
        { id: 'a', text: 'Amazon S3' },
        { id: 'b', text: 'Amazon EC2' },
        { id: 'c', text: 'Amazon VPC' },
        { id: 'd', text: 'Amazon Route 53' },
      ],
      correctAnswer: 'c',
    },
    {
      id: 2,
      text: 'What is the primary benefit of using Amazon S3 for object storage?',
      answers: [
        { id: 'a', text: 'Low latency' },
        { id: 'b', text: 'High durability' },
        { id: 'c', text: 'Relational data storage' },
        { id: 'd', text: 'Server-side scripting' },
      ],
      correctAnswer: 'b',
    },
    // Add more questions here...
  ],
};
