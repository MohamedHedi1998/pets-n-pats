import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import {
  Flex,
  Heading,
  Image,
  Box,
  HStack,
  Tooltip,
  IconButton,
  Text,
} from '@chakra-ui/react'
import { EditIcon } from '@chakra-ui/icons'

import AddCommentPopover from '@/components/AddCommentPopover'

export default function AnimalTile({ animal }) {
  const images = JSON.parse(animal.imageUrl)
  const randomIndex = Math.floor(Math.random() * images.length)
  const image = images[randomIndex]
  return (
    <Flex width='400px' direction='column' alignItems={'center'}>
      <Image
        boxSize='400px'
        objectFit='cover'
        shadow='lg'
        src={image}
        alt={`An image of ${animal.name}`}
        borderRadius='md'
        zIndex='2'
        borderWidth='0 1px 1px 1px'
        borderColor='teal.900'
      />
      <Box
        width='95%'
        bg='teal.100'
        roundedBottom='md'
        p='4'
        borderWidth='0 1px 1px 1px'
        borderColor='teal.300'
        zIndex='1'
        boxShadow='inner'
      >
        <HStack justifyContent='space-between' mb='6'>
          <Heading as='h3' fontSize='2xl' color='teal.800'>
            {animal.name}
          </Heading>
          <AddCommentIcon animal={animal} />
        </HStack>
        <Box>
          <Text as='p' fontWeight='semibold' minH='100px' color='teal.600'>
            {animal.bio}
          </Text>
        </Box>
      </Box>
    </Flex>
  )
}

function AddCommentIcon({ animal }) {
  const { isAuthenticated } = useAuth0()

  if (isAuthenticated) {
    return <AddCommentPopover animal={animal} />
  } else {
    return (
      <Tooltip hasArrow label='Sign in to add a comment' shouldWrapChildren>
        <IconButton icon={<EditIcon />} isDisabled colorScheme='teal' />
      </Tooltip>
    )
  }
}
