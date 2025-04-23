"use client";

import { useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { FolderKanban, Store, Play } from 'lucide-react';

const DashboardPage = () => {
	const { user } = useUser();

	const recentProjects = [
		{ id: 1, title: 'Business Landing Page', type: 'Website', lastEdited: '2 days ago', icon: FolderKanban },
		{ id: 2, title: 'Product Promo Video', type: 'Video', lastEdited: 'yesterday', icon: Play },
	];

	const marketplaceItems = [
		{ id: 1, title: 'AI Website Builder', description: 'Generate a complete website from a description', credits: 750, icon: Store },
		{ id: 2, title: 'AI Image Generator', description: 'Create high-quality images with text prompts', credits: 50, icon: Store },
		{ id: 3, title: 'Video Generator', description: 'Create videos from text', credits: 300, icon: Store },
	];

	return (
		<div className="p-6 space-y-8">
			<div className="flex justify-between items-center">
				<h2 className="text-3xl font-bold text-foreground">
					Welcome back, {user?.firstName || 'User'}!
				</h2>
				<Button variant="secondary">
					Create New Project
				</Button>
			</div>

			<div>
				<h3 className="text-xl font-semibold mb-4 text-foreground">Recent Projects</h3>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{recentProjects.map((project) => (
						<Card key={project.id}>
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-sm font-medium">{project.title}</CardTitle>
								<project.icon className="h-4 w-4 text-muted-foreground" />
							</CardHeader>
							<CardContent>
								<div className="text-xs text-muted-foreground">
									Last edited {project.lastEdited}
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</div>

			<div>
				<h3 className="text-xl font-semibold mb-4 text-foreground">Marketplace</h3>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{marketplaceItems.map((item) => (
						<Card key={item.id}>
							<CardHeader>
								<CardTitle className="flex items-center gap-2 text-sm font-medium">
									<item.icon className="h-4 w-4 text-muted-foreground" />
									{item.title}
								</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-xs text-muted-foreground mb-2">{item.description}</p>
								<span className="text-sm font-semibold">{item.credits} Credits</span>
							</CardContent>
							<CardFooter>
								<Button variant="outline" size="sm" className="w-full">Try</Button>
							</CardFooter>
						</Card>
					))}
				</div>
			</div>
		</div>
	);
};

export default DashboardPage;
