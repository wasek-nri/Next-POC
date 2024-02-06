import { Box, Skeleton } from '@mui/material';

function LoadingLines() {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      {Array.from(new Array(3)).map((_, index) => (
        <Skeleton
          key={index}
          variant="rounded"
          animation="wave"
          width="50%"
          //   height={60}
          style={{ marginBottom: 6 }}
        />
      ))}
    </Box>
  );
}

export default LoadingLines;
