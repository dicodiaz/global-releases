import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';

export default function Movie(props) {
  const { movie } = props;
  const { title, overview, popularity, poster_path, release_date, vote_average } = movie;
  return (
    <Card className="bg-secondary h-100">
      <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500/${poster_path}`} />
      <Card.Body>
        <Card.Title className="fs-2">{title}</Card.Title>
        <Card.Text className="small">{overview}</Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <DataTag desc="Release Date" data={release_date} />
        <DataTag desc="Rating" data={vote_average} />
        <DataTag desc="Popularity" data={popularity} />
      </ListGroup>
    </Card>
  );
}

function DataTag(props) {
  const { desc, data } = props;
  return (
    <ListGroupItem className="bg-secondary text-white">
      <span className="fw-bold">{desc}:</span> {data}
    </ListGroupItem>
  );
}
