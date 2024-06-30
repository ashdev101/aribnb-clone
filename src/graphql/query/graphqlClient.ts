

import { authOption } from '@/utils/authOptions';
import getCurrentUser from '@/utils/getCurrentUser';
import { GraphQLClient } from 'graphql-request';
import { getServerSession } from 'next-auth';

const getUserId = async () => {
    const session = await getServerSession(authOption)
    return session?.user?.email
}

export const Graphqlclient = new GraphQLClient(
    'https://airbnb-server-graphql.onrender.com/graphql',
    {
        headers: {
            authorization: `Bearer`,
        },
    },
);


