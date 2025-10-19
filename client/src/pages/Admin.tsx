import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Plus, Lock, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Post, InsertPost } from "@shared/schema";

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [postType, setPostType] = useState<"news" | "promo" | "update">("news");
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    publishDate: "",
    published: false,
  });
  const { toast } = useToast();

  const { data: posts, isLoading } = useQuery<Post[]>({
    queryKey: ["/api/posts"],
    enabled: isAuthenticated,
  });

  const createMutation = useMutation({
    mutationFn: async (data: InsertPost) => {
      return await apiRequest("POST", "/api/posts", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/posts"] });
      setIsDialogOpen(false);
      resetForm();
      toast({
        title: "Success",
        description: "Post created successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create post",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<InsertPost> }) => {
      return await apiRequest("PUT", `/api/posts/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/posts"] });
      setIsDialogOpen(false);
      resetForm();
      toast({
        title: "Success",
        description: "Post updated successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update post",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await apiRequest("DELETE", `/api/posts/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/posts"] });
      toast({
        title: "Success",
        description: "Post deleted successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete post",
        variant: "destructive",
      });
    },
  });

  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      publishDate: "",
      published: false,
    });
    setEditingPost(null);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin123") {
      setIsAuthenticated(true);
      toast({
        title: "Login successful",
        description: "Welcome to the admin panel",
      });
    } else {
      toast({
        title: "Login failed",
        description: "Incorrect password",
        variant: "destructive",
      });
    }
  };

  const handleCreatePost = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const handleEditPost = (post: Post) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      content: post.content,
      publishDate: post.publishDate,
      published: post.published,
    });
    setIsDialogOpen(true);
  };

  const handleDeletePost = (id: string) => {
    if (confirm("Are you sure you want to delete this post?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const postData: InsertPost = {
      type: postType,
      title: formData.title,
      content: formData.content,
      publishDate: formData.publishDate,
      published: formData.published,
    };

    if (editingPost) {
      updateMutation.mutate({ id: editingPost.id, data: postData });
    } else {
      createMutation.mutate(postData);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[hsl(40,45%,85%)]">
        <Card className="w-full max-w-md p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Admin Panel</h1>
            <p className="text-muted-foreground">Enter password to access CMS</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                data-testid="input-admin-password"
              />
            </div>
            <Button type="submit" className="w-full" data-testid="button-admin-login">
              Login
            </Button>
          </form>
        </Card>
      </div>
    );
  }

  const filteredPosts = (type: string) => posts?.filter((p) => p.type === type) || [];

  return (
    <div className="min-h-screen pt-20 bg-background">
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold" data-testid="text-admin-title">
                Content Management
              </h1>
              <p className="text-muted-foreground mt-2">
                Manage news, promos, and tour updates
              </p>
            </div>
            <Button onClick={() => setIsAuthenticated(false)} variant="outline">
              Logout
            </Button>
          </div>

          <Tabs defaultValue="news" onValueChange={(value) => setPostType(value as any)}>
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="news" data-testid="tab-news">
                News
              </TabsTrigger>
              <TabsTrigger value="promo" data-testid="tab-promos">
                Promos
              </TabsTrigger>
              <TabsTrigger value="update" data-testid="tab-updates">
                Updates
              </TabsTrigger>
            </TabsList>

            {["news", "promo", "update"].map((type) => (
              <TabsContent key={type} value={type} className="mt-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold capitalize">{type}s</h2>
                  <Button
                    onClick={handleCreatePost}
                    className="gap-2"
                    data-testid={`button-create-${type}`}
                  >
                    <Plus className="w-4 h-4" />
                    Create {type}
                  </Button>
                </div>

                {isLoading ? (
                  <div className="text-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
                    <p className="text-muted-foreground mt-4">Loading...</p>
                  </div>
                ) : filteredPosts(type).length === 0 ? (
                  <Card className="p-12 text-center">
                    <p className="text-muted-foreground">No {type}s yet. Create one to get started!</p>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPosts(type).map((post) => (
                      <Card key={post.id} className="p-6 hover-elevate" data-testid={`card-post-${post.id}`}>
                        <div className="flex items-start justify-between mb-3">
                          <Badge variant={post.published ? "default" : "secondary"}>
                            {post.published ? "Published" : "Draft"}
                          </Badge>
                          <div className="flex gap-2">
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => handleEditPost(post)}
                              data-testid={`button-edit-${post.id}`}
                              disabled={deleteMutation.isPending}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => handleDeletePost(post.id)}
                              data-testid={`button-delete-${post.id}`}
                              disabled={deleteMutation.isPending}
                            >
                              {deleteMutation.isPending ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <Trash2 className="w-4 h-4" />
                              )}
                            </Button>
                          </div>
                        </div>
                        <h3 className="text-lg font-bold mb-2">{post.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
                          {post.content}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Publish: {new Date(post.publishDate).toLocaleDateString()}
                        </p>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingPost ? "Edit" : "Create"} {postType}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Enter title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                data-testid="input-post-title"
                required
              />
            </div>

            <div>
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                placeholder="Enter content"
                rows={6}
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                data-testid="textarea-post-content"
                required
              />
            </div>

            <div>
              <Label htmlFor="publishDate">Publish Date</Label>
              <Input
                id="publishDate"
                type="date"
                value={formData.publishDate}
                onChange={(e) => setFormData({ ...formData, publishDate: e.target.value })}
                data-testid="input-publish-date"
                required
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="published"
                checked={formData.published}
                onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                data-testid="checkbox-published"
              />
              <Label htmlFor="published">Publish immediately</Label>
            </div>

            <div className="flex gap-3 justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsDialogOpen(false);
                  resetForm();
                }}
                disabled={createMutation.isPending || updateMutation.isPending}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                data-testid="button-save-post"
                disabled={createMutation.isPending || updateMutation.isPending}
              >
                {(createMutation.isPending || updateMutation.isPending) ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Saving...
                  </>
                ) : (
                  "Save"
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
