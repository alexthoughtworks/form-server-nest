export default () => ({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,
  kafkaBrokers: parseKafkaBrokers(process.env.KAFKA_BROKERS),
});

const parseKafkaBrokers = (brokerString: string) => {
  return brokerString.split(',');
};
