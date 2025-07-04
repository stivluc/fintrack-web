import React from 'react';
import { Box, Card, CardContent, Skeleton, Grid } from '@mui/material';

// Skeleton pour les StatsCards du Dashboard
export const StatsCardSkeleton: React.FC = () => (
  <Card>
    <CardContent sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ flex: 1 }}>
          <Skeleton variant="text" width="60%" height={24} />
          <Skeleton variant="text" width="80%" height={36} sx={{ mt: 1 }} />
          <Skeleton variant="text" width="40%" height={20} sx={{ mt: 1 }} />
        </Box>
        <Skeleton variant="circular" width={48} height={48} />
      </Box>
    </CardContent>
  </Card>
);

// Skeleton pour les graphiques
export const ChartSkeleton: React.FC<{ height?: number }> = ({ height = 300 }) => (
  <Card sx={{ height: height + 100 }}>
    <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Skeleton variant="text" width="40%" height={24} sx={{ mb: 3 }} />
      <Box sx={{ flex: 1, display: 'flex', alignItems: 'end', gap: 1 }}>
        {Array.from({ length: 12 }).map((_, index) => (
          <Skeleton
            key={index}
            variant="rectangular"
            width="100%"
            height={Math.random() * height * 0.8 + height * 0.2}
            sx={{ borderRadius: 1 }}
          />
        ))}
      </Box>
    </CardContent>
  </Card>
);

// Skeleton pour les tableaux de transactions
export const TransactionTableSkeleton: React.FC = () => (
  <Card>
    <CardContent sx={{ p: 0 }}>
      {Array.from({ length: 8 }).map((_, index) => (
        <Box
          key={index}
          sx={{
            display: 'flex',
            alignItems: 'center',
            p: 2,
            borderBottom: index < 7 ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
          }}
        >
          <Skeleton variant="circular" width={40} height={40} sx={{ mr: 2 }} />
          <Box sx={{ flex: 1 }}>
            <Skeleton variant="text" width="70%" height={20} />
            <Skeleton variant="text" width="40%" height={16} sx={{ mt: 0.5 }} />
          </Box>
          <Box sx={{ textAlign: 'right' }}>
            <Skeleton variant="text" width={80} height={20} />
            <Skeleton variant="text" width={60} height={16} sx={{ mt: 0.5 }} />
          </Box>
        </Box>
      ))}
    </CardContent>
  </Card>
);

// Skeleton pour les items de budget
export const BudgetItemSkeleton: React.FC = () => (
  <Card>
    <CardContent sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Skeleton variant="text" width="50%" height={24} />
        <Skeleton variant="circular" width={24} height={24} />
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Skeleton variant="text" width="60%" height={16} />
        <Skeleton variant="text" width="30%" height={16} />
      </Box>

      <Skeleton variant="rectangular" height={8} sx={{ borderRadius: 4, mb: 2 }} />

      <Skeleton variant="text" width="40%" height={16} />
    </CardContent>
  </Card>
);

// Skeleton pour le Dashboard complet
export const DashboardSkeleton: React.FC = () => (
  <Box>
    <Skeleton variant="text" width="30%" height={40} sx={{ mb: 4 }} />

    <Grid container spacing={3} sx={{ mb: 4 }}>
      {Array.from({ length: 4 }).map((_, index) => (
        <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={index}>
          <StatsCardSkeleton />
        </Grid>
      ))}
    </Grid>

    <Grid container spacing={3}>
      <Grid size={{ xs: 12, lg: 7 }}>
        <ChartSkeleton height={400} />
      </Grid>
      <Grid size={{ xs: 12, lg: 5 }}>
        <ChartSkeleton height={400} />
      </Grid>
    </Grid>
  </Box>
);

// Skeleton pour la page Transactions
export const TransactionsSkeleton: React.FC = () => (
  <Box>
    <Skeleton variant="text" width="30%" height={40} sx={{ mb: 4 }} />

    <Card sx={{ mb: 3 }}>
      <CardContent sx={{ p: 3 }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Skeleton variant="rectangular" height={56} sx={{ borderRadius: 1 }} />
          </Grid>
          <Grid size={{ xs: 6, md: 4 }}>
            <Skeleton variant="rectangular" height={56} sx={{ borderRadius: 1 }} />
          </Grid>
          <Grid size={{ xs: 6, md: 4 }}>
            <Skeleton variant="rectangular" height={56} sx={{ borderRadius: 1 }} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>

    <TransactionTableSkeleton />
  </Box>
);

// Skeleton pour la page Budgets
export const BudgetsSkeleton: React.FC = () => (
  <Box>
    <Skeleton variant="text" width="30%" height={40} sx={{ mb: 4 }} />

    <Grid container spacing={3} sx={{ mb: 4 }}>
      {Array.from({ length: 3 }).map((_, index) => (
        <Grid size={{ xs: 12, sm: 4 }} key={index}>
          <StatsCardSkeleton />
        </Grid>
      ))}
    </Grid>

    <Grid size={{ xs: 12 }} mb={4}>
      <ChartSkeleton height={300} />
    </Grid>

    <Grid container spacing={3}>
      <Grid size={{ xs: 12, lg: 8 }}>
        <Grid container spacing={3}>
          {Array.from({ length: 6 }).map((_, index) => (
            <Grid size={{ xs: 12, sm: 6 }} key={index}>
              <BudgetItemSkeleton />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  </Box>
);

// Skeleton pour la page Analytics
export const AnalyticsSkeleton: React.FC = () => (
  <Box>
    <Skeleton variant="text" width="30%" height={40} sx={{ mb: 4 }} />

    <Grid container spacing={3} sx={{ mb: 4 }}>
      <Grid size={{ xs: 12, lg: 6 }}>
        <ChartSkeleton height={400} />
      </Grid>
      <Grid size={{ xs: 12, lg: 6 }}>
        <ChartSkeleton height={400} />
      </Grid>
    </Grid>

    <Grid container spacing={3}>
      {Array.from({ length: 3 }).map((_, index) => (
        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
          <StatsCardSkeleton />
        </Grid>
      ))}
    </Grid>
  </Box>
);

// Skeleton générique pour le contenu
export const ContentSkeleton: React.FC<{ lines?: number }> = ({ lines = 3 }) => (
  <Box>
    {Array.from({ length: lines }).map((_, index) => (
      <Skeleton
        key={index}
        variant="text"
        width={index === lines - 1 ? '60%' : '100%'}
        height={20}
        sx={{ mb: 1 }}
      />
    ))}
  </Box>
);

// Skeleton pour les pages de profil
export const ProfileSkeleton: React.FC = () => (
  <Box>
    <Skeleton variant="text" width="30%" height={40} sx={{ mb: 4 }} />

    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 4 }}>
        <Card>
          <CardContent sx={{ p: 3, textAlign: 'center' }}>
            <Skeleton variant="circular" width={100} height={100} sx={{ mx: 'auto', mb: 2 }} />
            <Skeleton variant="text" width="80%" height={24} sx={{ mx: 'auto', mb: 1 }} />
            <Skeleton variant="text" width="60%" height={16} sx={{ mx: 'auto' }} />
          </CardContent>
        </Card>
      </Grid>
      <Grid size={{ xs: 12, md: 8 }}>
        <Card>
          <CardContent sx={{ p: 3 }}>
            <Skeleton variant="text" width="40%" height={24} sx={{ mb: 3 }} />
            <Grid container spacing={2}>
              {Array.from({ length: 4 }).map((_, index) => (
                <Grid size={{ xs: 12, sm: 6 }} key={index}>
                  <Skeleton variant="rectangular" height={56} sx={{ borderRadius: 1, mb: 2 }} />
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  </Box>
);

// Spinner de chargement simple
export const LoadingSpinner: React.FC<{ size?: number }> = ({ size = 40 }) => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 3 }}>
    <Box
      sx={{
        width: size,
        height: size,
        border: '3px solid rgba(255, 255, 255, 0.1)',
        borderTop: '3px solid #4F46E5',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        '@keyframes spin': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      }}
    />
  </Box>
);

const LoadingSkeletons = {
  StatsCardSkeleton,
  ChartSkeleton,
  TransactionTableSkeleton,
  BudgetItemSkeleton,
  DashboardSkeleton,
  TransactionsSkeleton,
  BudgetsSkeleton,
  AnalyticsSkeleton,
  ContentSkeleton,
  ProfileSkeleton,
  LoadingSpinner,
};

export default LoadingSkeletons;